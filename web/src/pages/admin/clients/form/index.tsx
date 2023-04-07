import { Box } from '@mui/material';
import { styles } from './styles';
import AddressForm from 'components/admin/AddressForm';

const ClientsFormAdmin = () => {
  return (
    <>
      <Box sx={styles.boxContainer}>
        <Box
          component='form'
          sx={styles.boxForm}
        >
          <AddressForm />
        </Box>
      </Box>
    </>
  );
};

export default ClientsFormAdmin;