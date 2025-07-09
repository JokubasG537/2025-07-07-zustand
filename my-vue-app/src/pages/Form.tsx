import { useState } from "react";
import { useApiMutation } from "../hooks/useApiQuery";
import '../styles/Form.css'; 

type NewItem = {
    name: string;
}

type CreateItem = {
    id: number;
    name: string;
};

export default function Form() {
    const [name, setName] = useState("");
    
    
    const createItem = useApiMutation<CreateItem, NewItem>('/items', 'POST', ['items'], {
        onSuccess: (data) => {
            alert(`Item created: ${data.name}`);
           
        },
        onError: (error) => {
            if (hasMessage(error)) {
                alert(`Error creating item: ${error.message}`);
            } else {
                alert('An unexpected error occurred while creating the item.');
            }
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createItem.mutate({ name})
        setName("");
    }

   
    function hasMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ); 
}

  return (
    <div className="form-page">
        <h1>This is form page</h1>
        <form onSubmit={handleSubmit}>
            <div className="floating-label">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    required
                />
                <button type="submit" disabled={createItem.isLoading}> Submit</button>
            </div>
        </form>
    </div>
)

}  
























// type NewItem = {
//     name: string
 
// }

// type CreateItem = {
//     id: number;
//     name: string;
    
// }

// export default function Form() {
//     const [name, setName] = useState("");
//     const createItem = useApiMutation<CreateItem, NewItem>('/items', 'POST', ['items'], {
//         onSuccess: (data) => {
//             alert(`Item created: ${data.name}`);
//         }
//     })

    // const handleSubmit = (e: React.FormEvent) => {
    //    e.preventDefault();
    //    createItem.mutate({name})
    //    setName("");
    // };

//     return (
//         <div>
//         <h1>Form Page</h1>
//         <p>This is a placeholder for the form page.</p>
//         <form onSubmit={handleSubmit}>
//             <input type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter item name" 
//             required
//             />
//             <button type="submit" disabled={createItem.isLoading}>
//         {createItem.isLoading ? 'Creating...' : 'Create'}
//       </button>
//         </form>
//         </div>
//     );
// }