import { StackProps, VStack } from "@chakra-ui/react";

export default function Body(props:StackProps)
{
    const h = "calc(100% - 2.5em)";
    return <VStack w="100%" h={h} maxW="100%" maxH={h} {...props}>
        {props.children}
    </VStack>
    
}