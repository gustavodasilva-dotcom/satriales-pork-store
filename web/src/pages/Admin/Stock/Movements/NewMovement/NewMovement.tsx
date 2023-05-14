import { FC, useState } from 'react';
import { Box } from '@mui/material';

import ProductStockSearch from './components/ProductStockSearch';
import NewMovementForm from './components/NewMovementForm';

import { IProduct } from 'interfaces/IProduct';

const NewMovement: FC = () => {
  const [_showForm, _setShowForm] = useState(false);
  const [_productFound, _setProductFound] = useState<IProduct | undefined>();

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductStockSearch
        setShowForm={_setShowForm}
        productFound={_productFound}
        setProductFound={_setProductFound}
      />
      <NewMovementForm
        showForm={_showForm}
        product={_productFound}
      />
    </Box>
  );
};

export default NewMovement;