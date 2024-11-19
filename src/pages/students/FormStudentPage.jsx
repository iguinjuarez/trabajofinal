import { useNavigate } from 'react-router-dom';
import PageContent from '../../components/PageContent';
import ButtonComponent from '../../components/Button';
import {useForm} from 'react-hook-form';
import '../MainPage.css';
const FormStudentPage = () => {
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        try{
            const body = {
                firstname: values.inputNameValue,
                lastName: values.inputLastNameValue,
                dni: values.inputDniValue,
                email: values.inputEmailValue
            };
                const response = await fetch(`/api/students/`,{
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                if(response.ok){
                    window.alert('Estudiante agregado con exito');
                    reset();
                    navigate(-1);
                } else {
                    const errorData = await response.json();
                    window.alert(`Error response: ${errorData.message}`);
                }
        }catch(err){
            console.error(err)
        }
    }


    return (
        <PageContent
        headerTitle='Nuevo Alumno'
        actions={[
            <ButtonComponent key={'back'}
            text="Atrás"
            onClick={() => navigate(-1)}
            className='actions-class-back'
            ></ButtonComponent>
        ]}
        >    
        <div className='content-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-style">
                        <div className="form-add">
                            <label htmlFor="inputNameValue">Nombre:</label>    
                            <input 
                            type='text'
                            placeholder='Ingrese un nombre..'
                            id='inputNameValue'
                            {...register('inputNameValue', {
                                required: {
                                    value: true,
                                    message: "Nombre es requerido"
                                },
                                maxLength:{
                                    value: 100,
                                    message:"Nombre debe tener menor de 100 carácteres"
                                },
                            })}/>
                            {errors.inputNameValue && <p className='content-input-error-name'>{errors.inputNameValue?.message}</p>}  
                        </div>            
                        <div className="form-add">
                            <label htmlFor="inputLastNameValue">Apellido:</label>                        
                            <input type="text" placeholder="Ingrese un apellido.." 
                            id='inputLastNameValue'
                            {...register('inputLastNameValue', {
                                required: {
                                    value: true,
                                    message: "Apellido es requerido"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Apellido debe tener menos de 100 carácteres"
                                }
                            })}/>
                            {
                                errors.inputLastNameValue && <p className='content-input-error-last'>{errors.inputLastNameValue?.message}</p>
                            } 
                        </div>                              
                        <div className="form-add">
                            <label htmlFor="inputDniValue">DNI:</label>                        
                            <input type="text" placeholder="Ingrese un dni.." 
                            id='inputDniValue'
                            {...register('inputDniValue', {
                                required:{
                                    value: true,
                                    message: "Dni es requerido"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Dni debe tener menos de 10 carácteres"
                                },
                                pattern: {
                                    value: /^[0-9]{1,10}$/ ,
                                    message: "Dni es incorrecto"
                                }
                            })} />  
                            {
                                errors.inputDniValue && <p className='content-input-error-dni'>{errors.inputDniValue?.message}</p>
                            }  
                        </div>                              
                        <div className="form-add">
                            <label htmlFor="inputEmailValue">Email:</label>                    
                            <input type="text" placeholder="Ingrese un email.." 
                            id='inputEmailValue'
                            {...register('inputEmailValue', {
                                required: {
                                    value: true,
                                    message: "Email es requerido"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Email debe tener menos de 100 carácteres"
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
                                    message: "Email es incorrecto"
                                }
                            })}/>  
                            {
                                errors.inputEmailValue && <p className='content-input-error-email'>{errors.inputEmailValue?.message}</p>
                            }  
                        </div>                           
                        <div className='content-input-button action-accepted '>
                            <ButtonComponent
                            type='submit'
                            text='Aceptar'
                            className='actions-class'
                            >
                            </ButtonComponent>
                        </div>
            </div>
            </form>
        </div>
        </PageContent>
    )
};

export default FormStudentPage;