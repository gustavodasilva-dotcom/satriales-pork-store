import { FC, useEffect, useState } from 'react';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { INaturalPerson } from 'interfaces/INaturalPerson';
import { plainModal } from 'utils/Modals';

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
      } catch (error: any) {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else {
          message = 'Failed to get clients';
        }

        plainModal({
          type: 'error',
          message
        });
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
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else if (error?.response?.status === 404) {
          message = 'Client not found';
        } else {
          message = 'Failed to get clients';
        }

        plainModal({
          type: 'error',
          message
        });
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
                  <IconButton
                    aria-label='edit'
                    size='medium'
                  >
                    <Link to={`/admin/clients/${client._id}`}>
                      <Edit color='primary' />
                    </Link>
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='medium'
                  >
                    <DeleteForever
                      color='error'
                      onClick={() => _deleteClient(client._id)}
                    />
                  </IconButton>
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