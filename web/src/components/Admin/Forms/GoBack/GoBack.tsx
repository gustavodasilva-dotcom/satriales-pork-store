import { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { IGoBackProps } from './GoBack.types';

const GoBack: FC<IGoBackProps> = ({ to }) => {
  return (
    <Box>
      <Tooltip title='Go back'>
        <Link to={to}>
          <IconButton sx={{ mb: 2 }}>
            <ArrowBack
              color='primary'
              fontSize='medium'
            />
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default GoBack;