import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const onSubmit = data => console.log(data);
    console.log(watch("example"));
    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name"/>
            { errors.exampleRequired && <span className="error">Name is required</span>}
            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your nemail"/>
            { errors.exampleRequired && <span className="error">Email is required</span>}
            < input name="address" ref={register({ required: true })} placeholder="your address"/>
            { errors.exampleRequired && <span className="error">Address is required</span>}
            < input name="phone" ref={register({ required: true })} placeholder="your phone number"/>
            { errors.exampleRequired && <span className="error">Phone Number is required</span>}
            <input type="submit" />
        </form >
    );
};
export default Shipment;