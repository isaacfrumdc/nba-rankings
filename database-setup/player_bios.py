import requests
from settings import Settings
from models import PlayerBios

settings = Settings()
settings.db.create_tables([PlayerBios], safe=True)

headers  = {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'x-nba-stats-token': 'true',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'x-nba-stats-origin': 'stats',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Referer': 'https://stats.nba.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
}

player_info_url = 'https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=1&LeagueID=00&Season=2021-22&SeasonType=Regular%20Season&TeamID=0&Weight='
response = requests.get(url=player_info_url, headers=headers).json()
player_info = response['resultSets'][0]['rowSet']
for row in player_info:
    player = PlayerBios(
        person_id = row[0],
        player_last_name = row[1],
        player_first_name = row[2],
        player_slug = row[3],
        team_id = row[4],
        team_slug = row[5],
        is_defunct = row[6],
        team_city = row[7],
        team_name = row[8],
        team_abbreviation = row[9],
        jersey_number = row[10],
        position = row[11],
        height = row[12],
        weight = row[13],
        college = row[14],
        country = row[15],
        draft_year = row[16],
        draft_round = row[17],
        draft_number = row[18],
        roster_status = row[19],
        pts = row[20],
        reb = row[21],
        ast = row[22],
        stats_timeframe = row[23],
        from_year = row[24],
        to_year = row[25])
    player.save()
