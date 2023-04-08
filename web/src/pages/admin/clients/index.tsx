import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { INaturalPerson } from 'interfaces/INaturalPerson';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const URL = 'v2/person/natural';

const ClientsAdmin = () => {
  const [clients, setClients] = useState<INaturalPerson[]>([]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get<INaturalPerson[]>(URL, {
          signal: controller.signal
        });
        isMounted && setClients(response.data);
      } catch (error) {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteClient = (id: string) => {
    axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherClients = clients.filter(client => client._id !== id);
        setClients([...otherClients]);
      })
      .catch(error => {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
      });
  };

  return (
    <>
      <Link to='/admin/clients/new' style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='primary'>
          Novo
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>SSN</b>
              </TableCell>
              <TableCell>
                <b>Options</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients && clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>
                  {client?.name}
                </TableCell>
                <TableCell>
                  {client?.ssn}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/clients/${client._id}`}>
                    <Edit color='primary' />
                  </Link>
                  <DeleteForever
                    color='error'
                    onClick={() => deleteClient(client._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ClientsAdmin;