import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../hooks/useApiQuery';
import { useQueryClient } from '@tanstack/react-query';

import '../styles/Form.css';


type UpdateItem = {
    id: string;
    name: string;
}

type UpdateResponse = {
    id: string;
    name: string;
}

type Item = {
    id: string;
    name: string;
}



export default function PutForm() {
    const [name, setName] = useState("");
    const [editing, setEditing] = useState(false);
    const [itemId, setItemId] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const {data: items, isLoading, error} = useApiQuery<Item[]>(
        ['items'],
        '/items',
        { enabled: true }
    )

     function hasMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ); 
}

    const updateItem = useApiMutation<UpdateResponse, UpdateItem>(
        `/items/${itemId}`,
        'PUT',
        ['items'],
        {
            onSuccess: (data) => {
                alert(`Item updated: ${data.name}`);
                setEditing(false);
                setItemId(null);
                  queryClient.invalidateQueries({ queryKey: ['items'] });

            },
            onError: (error) => {
                if (hasMessage(error)) {
                    alert(`Error updating item: ${error.message}`);
                } else {
                    alert('An unexpected error occurred while updating the item.');
                }
            }
        }
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateItem.mutate({ id: itemId!, name });
        setName("");
    }

    const deleteItem = useApiMutation<void, void>(
        `/items/${itemId}`,
        'DELETE',
        ['items'],
        {
            onSuccess: () => {
                alert('Item deleted successfully');
                setItemId(null);
                queryClient.invalidateQueries({ queryKey: ['items'] });
            },
            onError: (error) => {
                if (hasMessage(error)) {
                    alert(`Error deleting item: ${error.message}`);
                } else {
                    alert('An unexpected error occurred while deleting the item.');
                }
            }
        }
    )

    const handleDelete = (id) => {
            deleteItem.mutate();
      
    }

  

   
    return (
        <div>
        <h1>Put Form</h1>
        <p>This is a placeholder for the PUT form functionality.</p>
       { isLoading && <p>Loading items...</p> }
         { error && <p>Error loading items: {error.message}</p> }
   
   
    {items && !editing ? (
  items.map((item: Item) => {
    return (
      <div key={item.id}>
        <p>{item.name}</p>
        <button onClick={() => (
            setEditing(true),
            setItemId(item.id),
            setName(item.name)
            
        )}>
            Edit
        </button>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
       
      </div>
    );
  })
) : (
    <div className="form">
        <form onSubmit={handleSubmit}>
           
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    required
                />
                <button type="submit"> Submit</button>
            <label htmlFor="Name">Name</label>
        </form>
    </div>
)}

        </div>
    );
}