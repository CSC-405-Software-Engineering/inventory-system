import { useEffect, useState } from "react"

const Test: React.FC = () => {
    const [message, setMessage] = useState('')
    const fetchBackend = async () => {
        try{
            const message = (await fetch('/backend')).text();
            setMessage(await message);
        }catch(error: unknown){
            setMessage('');
        }
    }
    useEffect(() => {
        fetchBackend();
    }, [])
    return (
    <>
    <h3>Message from the backend:
   </h3><h1>{message}</h1>
    </>
    )
   }
   export default Test;