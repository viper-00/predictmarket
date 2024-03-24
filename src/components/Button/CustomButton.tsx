import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  width?: string;
  text?: string;
  colorScheme?: string;
  variant?: string;
  textAlign?: 'left' | 'center' | 'right';
  onClick?: () => Promise<void>;
  leftIcon?: any;
  rightIcon?: any;
  size?: string;
  isDisabled?: boolean;
  color?: string;
  backgroundColor?: string;
};

const CustomButton = (props: Props) => {
  const {
    size,
    width,
    text,
    colorScheme,
    variant,
    onClick,
    textAlign,
    leftIcon,
    rightIcon,
    isDisabled,
    color,
    backgroundColor,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
    }
    setIsLoading(false);
  };
  return (
    <Button
      color={color}
      backgroundColor={backgroundColor}
      colorScheme={colorScheme || 'blue'}
      textAlign={textAlign || 'left'}
      width={width || 'auto'}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      variant={variant || 'solid'}
      size={size || 'md'}
      isLoading={isLoading}
      isDisabled={isDisabled || false}
      onClick={handleClick}
    >
      <Text>{text}</Text>
    </Button>
  );
};

export default CustomButton;
