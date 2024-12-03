import { background, Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";

export interface ButtonWithIconProps extends ButtonProps
{
    icon:IconType
    label?:string
}


export function ConfirmButton(props:ButtonProps)
{
    return <Button color="white" bg="darkgreen" {...props}>
        <HStack>
            <FaCheckCircle/>
            <Text>Confirm</Text>
        </HStack>
    </Button>
}

export function SmallButtonWithIcon({label, icon, ...props}:ButtonWithIconProps)
{
    const Icon = icon;
    return <Button size="sm" color="white" className="glass" {...props}>
                {<Icon/>}
                {label && <Text ml="0.5em">{label}</Text>}
            </Button>
}

export function SmallRegisterButton(props:ButtonProps)
{
    return <SmallButtonWithIcon _hover={{backgroundColor:"#03c04Aaa"}} bg="#03c04A" color="black" label="Register" icon={FaCheckCircle} {...props} />;
}

export function SmallMintButton(props:ButtonProps)
{
    return <SmallButtonWithIcon _hover={{backgroundColor:"#03c04Aaa"}} bg="#03c04A" color="black" label="Mint" icon={FaCheckCircle} {...props} />;
}