// hahahahaha
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface ContainerProps extends BoxProps {
  title: string;
}

export const StyleContainer: React.FC<ContainerProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display:'flex',
        flexWrap:'wrap',
        padding:1,
        borderRadius: '4px',
        
      }}
    >
      <Box
        sx={{
          marginTop: '0',
          fontSize: '18px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Box>
    </Box>
  );
};