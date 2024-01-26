import { NavLink } from '@mantine/core';
import { Link, LinkComponent, LinkProps } from '@tanstack/react-router';

export type RouterNavLinkProps = {
  label: string;
} & LinkProps;

const RouterNavLink = (({ label, ...props }: RouterNavLinkProps) => (
  <Link
    {...props}
    activeOptions={{ exact: true }}
    style={{ textDecoration: 'none', color: 'unset' }}
  >
    {({ isActive }) => (
      <NavLink component="span" label={label} active={isActive} />
    )}
  </Link>
)) as LinkComponent<{ label: string }>;

export default RouterNavLink;
