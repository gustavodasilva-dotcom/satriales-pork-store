import { FC, useEffect, useState } from 'react';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { INaturalPerson } from 'interfaces/INaturalPerson';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const URL = 'v2/persons/natural';

const ClientsAdmin: FC = () => {
  const [_clients, _setClients] = useState<INaturalPerson[]>([]);

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _loadClients = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await _axiosPrivate.get<INaturalPerson[]>(URL, {
          signal: controller.signal
        });
        isMounted && _setClients(response.data);
      } catch (error) {
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(_loadClients, []);

  const _deleteClient = (id: string) => {
    _axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherClients = _clients.filter(client => client._id !== id);
        _setClients([...otherClients]);
      })
      .catch(error => {
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
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
            {_clients && _clients.map((client, index) => (
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
                    onClick={() => _deleteClient(client._id)}
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