import PageContent from "../../components/PageContent";
import { useNavigate }  from 'react-router-dom';
import '../MainPage.css';
import ButtonComponent from "../../components/Button";
import { useCallback, useState , useEffect} from "react";


const StudentPage = () => {
    const navigate = useNavigate();   
    return (
        <PageContent
        headerTitle="Alumnos"
        actions={[
            <ButtonComponent key={'add'}
            text="Agregar"
            onClick={() => navigate('/student/form')}
            className='actions-class'
            ></ButtonComponent>,
            <ButtonComponent key={'back'}
            text="Atrás"
            onClick={() => navigate(-1)}
            className='actions-class-back'
            ></ButtonComponent>,
        ]}
        >
            <TableAlumns/>  
        </PageContent>
    )
};
//table e input
const TableAlumns = () => {
    
    const [students, setStudents] = useState([]);
    const [fetchingStudents, setFetchingStudents] = useState(false);
    //values pagination
    const [valuePagination, setValuePagination] = useState(5);
    const [inputValueSearch, setInputValueSearch] = useState("");
    const [valueCurrentPage, setValueCurrentPage] = useState(1);
    //auxiliares
    const [studentsLength, setStudentsLength] = useState(0);
    const [studentsActually, setStudentsActually] = useState(0);

    //Operaciones
    const deleteStudent = async (sid) => {
        try{
            if(sid){
                const response = await fetch(`/api/students/${sid}`,{
                method: 'DELETE',
                });
                if(response.ok){
                    window.alert(`El estudiante de legajo ${sid} se borro correctamente`);
                    updateTable();
                } else {
                    window.alert(`Error al borrar`);
                }
            }
        }catch(err){
            console.error(err);
        }
    }

    const newPaginationSelected = (value) => {
        setValuePagination(value)
        setValueCurrentPage(1);
    }

    const updateTable = () => {
        setValueCurrentPage(1);
        fetchStudents();
        setInputValueSearch('');
    };

    const filterStudent = async () => {
    if(inputValueSearch){
        const response = await fetch(`/api/students?search=${inputValueSearch}&currentPage=${1}&pageSize=${valuePagination}`,{
            method: 'GET'
        });
        if(response.ok){
            const newStudents = await response.json();
            setStudentsLength(newStudents.count);
            setStudents(newStudents.rows);
            setStudentsActually(newStudents.count)
        } else {
            const errorData = await response.json();
            window.alert(`${errorData.message}`);
        }
    } else updateTable();
    };
    //hook
    const fetchStudents = useCallback(async() => {
        try{
        setFetchingStudents(true);
        const response = await fetch(`/api/students?search=${inputValueSearch}&currentPage=${valueCurrentPage}&pageSize=${valuePagination}`,{
            method: 'GET',
            });
        const data = await response.json();
        setStudents(data.rows);
        setStudentsLength(data.count);
        setStudentsActually(data.rows.length);
        } catch(err) {
        console.error(err);
        } finally {
        setFetchingStudents(false);
        }
    },[inputValueSearch, valueCurrentPage, valuePagination]);
    //use
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents,valueCurrentPage, valuePagination]);

    return (
        <>
        <div className="search-student">
            <input 
            type="text" 
            className="text-search" 
            placeholder="Buscar por Apellido" 
            value={inputValueSearch}
            onChange={(e) => {
                setInputValueSearch(e.target.value);
            }}
            />
            <ButtonComponent key={'search'}
            type='submit'
            text="Buscar"
            className="actions-class"
            onClick={() => filterStudent()}
            >
            </ButtonComponent>
        </div>
        <div className="table-student">
            {
                fetchingStudents
                ? <p>Cargando...</p>
                : <>
                {
                    !students.length && <p>Aún no hay estudiantes...</p>
                }
            <table>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => (
                            <tr key={student.sid}>
                                <td>{student.sid}</td>
                                <td>{student.firstname}</td>
                                <td>{student.lastName}</td>
                                <td>
                                    <ButtonComponent key={'delete'}
                                            text="Borrar"
                                            className='actions-class-back'
                                            onClick={() => (deleteStudent(student.sid))}
                                    >
                                    </ButtonComponent>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                <div className="pagination-style">
                    <label htmlFor="pages-values">
                        {studentsActually} items por página
                    </label>
                    <select 
                    name="pagesValues" 
                    id="pages-values" 
                    value={valuePagination}
                    onChange={(e) => newPaginationSelected(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <nav>
                        <ul className="nav-button">
                            {
                            Array(Math.ceil(studentsLength / valuePagination)) .fill() .map((_, i) => 
                                ( <li key={i + 1} className="li-button"> {valueCurrentPage === i + 1 
                                    ? 
                                    (<ButtonComponent
                                    className="actions-class button-selected"
                                    text={`${i + 1}`}
                                    onClick={() => setValueCurrentPage(i + 1)}
                                    /> 
                                    )
                                    : 
                                    (<ButtonComponent
                                    className="actions-class"
                                    text={`${i + 1}`}
                                    onClick={() => setValueCurrentPage(i + 1)}
                                    />
                                    )}
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
                </>
            }
        </div>
        </>
    );
}

export default StudentPage;