/* eslint-disable react/prop-types */
const UserForm = ({ userData, onChange, onSave, onCancel, isEditing }) => (
  <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
    <h2 className='text-lg font-semibold'>
      {isEditing ? 'Edit User' : 'Add User'}
    </h2>
    <form className='mt-4'>
      <div className='mb-4'>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={userData.name}
          onChange={onChange}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={userData.email}
          onChange={onChange}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='role'
          className='block text-sm font-medium text-gray-700'
        >
          Role
        </label>
        <input
          type='text'
          id='role'
          name='role'
          value={userData.role}
          onChange={onChange}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='phoneNumber'
          className='block text-sm font-medium text-gray-700'
        >
          Phone
        </label>
        <input
          type='text'
          id='phoneNumber'
          name='phoneNumber'
          value={userData.phoneNumber}
          onChange={onChange}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
        />
      </div>
      <div className='flex justify-between'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 bg-gray-300 text-white rounded-md'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={onSave}
          className='px-4 py-2 bg-blue-600 text-white rounded-md'
        >
          Save
        </button>
      </div>
    </form>
  </div>
);

export default UserForm;
