import { Flex, Icon } from '@chakra-ui/react';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9, RiNumber0 } from 'react-icons/ri';


const NumberGroup = () => {
    return (
        <Flex direction="column">
            <Icon size="lg" margin="2" as={RiNumber1} />
            <Icon size="lg" margin="2" as={RiNumber2} />
            <Icon size="lg" margin="2" as={RiNumber3} />
            <Icon size="lg" margin="2" as={RiNumber4} />
            <Icon size="lg" margin="2" as={RiNumber5} />
            <Icon size="lg" margin="2" as={RiNumber6} />
            <Icon size="lg" margin="2" as={RiNumber7} />
            <Icon size="lg" margin="2" as={RiNumber8} />
            <Icon size="lg" margin="2" as={RiNumber9} />
            <Flex my="2" direction="row">
                <Icon size="lg" as={RiNumber1} />
                <Icon mr="2" size="lg" as={RiNumber0} />
            </Flex>
        </Flex>
    )
};

export default NumberGroup;