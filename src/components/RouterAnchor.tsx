import {Link, LinkProps} from "@tanstack/react-router";
import {ReactNode} from "react";
import {Anchor} from "@mantine/core";

export interface RouterAnchorProps extends LinkProps {
    children: ReactNode
}

const RouterAnchor = ({children, ...props}: RouterAnchorProps) => {
    return <Link {...props} style={{textDecoration: 'none', color: 'unset'}}>
        {() => <Anchor component="span" underline="hover">{children}</Anchor>}
    </Link>
}

export default RouterAnchor;
