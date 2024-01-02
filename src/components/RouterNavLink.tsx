import { NavLink } from '@mantine/core';
import { Link, LinkProps } from '@tanstack/react-router';

export interface RouterNavLinkProps extends LinkProps {
  label: string;
}

const RouterNavLink = ({ label, ...props }: RouterNavLinkProps) => {
  return (
    <Link
      {...props}
      activeOptions={{ exact: true }}
      style={{ textDecoration: 'none', color: 'unset' }}
    >
      {({ isActive }) => (
        <NavLink component="span" label={label} active={isActive} />
      )}
    </Link>
  );
};

export default RouterNavLink;
