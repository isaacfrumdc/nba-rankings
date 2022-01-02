import { Container, Flex, HStack, VStack, Heading, Text, StackDivider } from '@chakra-ui/react';
import App from './App';
import SearchForm from './SearchForm';
import List from './List';

const IndexPage = () => (
    <Container maxW="container.xl" p={0}>
        {/* <Flex h="100vh" py={20}> */}
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" 
        divider={<StackDivider borderColor='gray.200' />}>
            <VStack spacing={3} alignItems="flex-start">
                <Heading size="2xl">NBA Rankings</Heading>
                <Text>See How Your Rankings Stack Up With the World</Text>
            </VStack>

            <HStack divider={<StackDivider borderColor='gray.200'/>}>
                <VStack spacing={3}>
                    <Heading size="xl">Your Top 10</Heading>
                    <Text>Your Top 10</Text>
                </VStack>
                <VStack spacing={3} bg="gray.100">
                    <Heading size="xl">Consensus Top 10</Heading>
                    <Text>Consensus Top 10</Text>
                </VStack>
            </HStack>

            <VStack spacing={3} alignItems="flex-start">
                <Heading size="xl">All Players</Heading>
                <Text>All Players</Text>
                <App/>
            </VStack>
        </VStack>





        {/* <HStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                <Heading size="2xl">NBA Rankings</Heading>
                <Text>Your Top 10</Text>
            </HStack>
            <HStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                    <VStack spacing={3} alignItems="flex-start">
                        <Heading size="2xl">Your Top 10</Heading>
                        <Text>Your Top 10</Text>
                </VStack>
                    <VStack spacing={3} alignItems="flex-start" bg="gray.50">
                        <Heading size="2xl">Consensus Top 10</Heading>
                        <Text>Consensus Top 10</Text>
                    </VStack>
            </HStack>
            <HStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
            <Heading size="2xl">All Players</Heading>
                        <Text>All Players</Text>
            </HStack> */}

        {/* </Flex> */}
    </Container>
);

export default IndexPage;