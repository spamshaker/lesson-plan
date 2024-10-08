import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix, IconProp } from '@fortawesome/fontawesome-svg-core';
import { useMemo } from 'react';

interface RegularIconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  icon: IconName;
}

const RegularIcon = ({ icon, ...props }: RegularIconProps) => {
  const iconName = useMemo(() => ['far' as IconPrefix, icon] as IconProp, [icon]);
  return <FontAwesomeIcon icon={iconName} {...props} />;
};

export default RegularIcon;