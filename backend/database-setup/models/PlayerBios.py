from peewee import *
from .BaseModel import BaseModel

class PlayerBios(BaseModel):
    person_id = IntegerField(null=True)
    player_last_name = CharField(null=True)
    player_first_name = CharField(null=True) 
    player_slug = CharField(null=True)
    team_id = IntegerField(null=True)
    team_slug = CharField(null=True)
    is_defunct = IntegerField(null=True)
    team_city = CharField(null=True)
    team_name = CharField(null=True)
    team_abbreviation = CharField(null=True)
    jersey_number = CharField(null=True)
    position = CharField(null=True)
    height = CharField(null=True)
    weight = CharField(null=True)
    college = CharField(null=True)
    country = CharField(null=True)
    draft_year = IntegerField(null=True)
    draft_round = IntegerField(null=True)
    draft_number = IntegerField(null=True)
    roster_status = CharField(null=True)
    pts = IntegerField(null=True)
    reb = IntegerField(null=True)
    ast = IntegerField(null=True)
    stats_timeframe = CharField(null=True)
    from_year = CharField(null=True)
    to_year = CharField(null=True)

    class Meta:
       db_table = 'player_bios'
    
