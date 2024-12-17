/* eslint-disable react/prop-types */
import { ButtonDelete, ButtonEdit } from '../components/button';
import { format } from 'date-fns';

const TableUsers = ({ users, onEdit, onDelete }) => (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Nama</th>
          <th scope="col" className="px-6 py-3">Email</th>
          <th scope="col" className="px-6 py-3">Role</th>
          <th scope="col" className="px-6 py-3">Nomor Telepon</th>
          <th scope="col" className="px-6 py-3">Dibuat</th>
          <th scope="col" className="px-6 py-3">Diperbarui</th>
          <th scope="col" className="px-6 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {user.name}
            </th>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.role}</td>
            <td className="px-6 py-4">{user.phoneNumber}</td>
            <td className="px-6 py-4">{format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm')}</td>
            <td className="px-6 py-4">{format(new Date(user.updatedAt), 'yyyy-MM-dd HH:mm')}</td>
            <td className="px-6 py-4 flex items-center gap-2">
              <ButtonEdit onClick={() => onEdit(user)} />
              <ButtonDelete onClick={() => onDelete(user.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableUsers;
