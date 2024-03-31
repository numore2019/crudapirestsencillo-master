import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:8080/estudiantes";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      estudianteId: '',
      nombres: '',
      apellidos: '',
      celular: '',
      correo: '',
      telefono: '',
      genero: '',
      fechaNacimiento: new Date(), 
      fechaIngreso: new Date(),
      direccion: '',
      nombrePadre: '',
      nombreMadre: '',
      encargado: '',
      tipoModal: ''
    }
  }

  peticionGet = () => {
    axios.get(url)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  peticionPost = async () => {
    delete this.state.form.estudianteId;
    await axios.post(`${url}/agregar1`, this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  peticionPut = () => {
    axios.put(`${url}/${this.state.form.estudianteId}`, this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      })
  }

  peticionDelete = () => {
    axios.delete(`${url}/${this.state.form.estudianteId}`)
      .then(response => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
      })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  seleccionarEstudiante = (estudiante) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        estudianteId: estudiante.estudianteId,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        celular: estudiante.celular,
        correo: estudiante.correo,
        telefono: estudiante.telefono,
        genero: estudiante.genero,
        fechaNacimiento: estudiante.fechaNacimiento,
        fechaIngreso: estudiante.fechaIngreso,
        direccion: estudiante.direccion,
        nombrePadre: estudiante.nombrePadre,
        nombreMadre: estudiante.nombreMadre,
        encargado: estudiante.encargado
      }
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };
  
  handleDateChange = date => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        fechaNacimiento: date // Actualiza la fecha de nacimiento
      }
    }));
  };

  handleDateChanger = date => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        fechaIngreso: date // Actualiza la fecha de nacimiento
      }
    }));
  };

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Colegio Divino Niño</h1>
        <button style={{ float: 'right' }} className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Estudiante</button>
  <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>Estudiante ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Genero</th>
              <th>Fecha Nacimiento</th>
              <th>Fecha Ingreso</th>
              <th>Direccion</th>
              <th>Nombre del Padre</th>
              <th>Nombre de la Madre</th>
              <th>Encargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(estudiante => {
              return (
                <tr key={estudiante.estudianteId}>
                  <td>{estudiante.estudianteId}</td>
                  <td>{estudiante.nombres}</td>
                  <td>{estudiante.apellidos}</td>
                  <td>{estudiante.celular}</td>
                  <td>{estudiante.correo}</td>
                  <td>{estudiante.telefono}</td>
                  <td>{estudiante.genero}</td>
                  <td>{estudiante.fechaNacimiento}</td>
                  <td>{estudiante.fechaIngreso}</td>
                  <td>{estudiante.direccion}</td>
                  <td>{estudiante.nombrePadre}</td>
                  <td>{estudiante.nombreMadre}</td>
                  <td>{estudiante.encargado}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarEstudiante(estudiante); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarEstudiante(estudiante); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              
              <br />
              <label htmlFor="nombres">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="nombres"
                id="nombres"
                onChange={this.handleChange}
                value={form ? form.nombres : ''}
              />
              <br />
              <label htmlFor="apellidos">Apellido</label>
              <input
                className="form-control"
                type="text"
                name="apellidos"
                id="apellidos"
                onChange={this.handleChange}
                value={form ? form.apellidos : ''}
              />
              <br />
              <label htmlFor="celular">Celular</label>
              <input
                className="form-control"
                type="text"
                name="celular"
                id="celular"
                onChange={this.handleChange}
                value={form ? form.celular : ''}
              />
              <br />
              <label htmlFor="correo">Correo</label>
              <input
                className="form-control"
                type="text"
                name="correo"
                id="correo"
                onChange={this.handleChange}
                value={form ? form.correo : ''}
              />
              <br />
              <label htmlFor="telefono">Teléfono</label>
              <input
                className="form-control"
                type="text"
                name="telefono"
                id="telefono"
                onChange={this.handleChange}
                value={form ? form.telefono : ''}
              />
              <br />
              <label htmlFor="genero">Género</label>
              <select
                className="form-control"
                name="genero"
                id="genero"
                onChange={this.handleChange}
                value={form ? form.genero : ''}
              >
                <option value="">Seleccionar género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <br />
              <label htmlFor="direccion">Dirección</label>
              <input
                className="form-control"
                type="text"
                name="direccion"
                id="direccion"
                onChange={this.handleChange}
                value={form ? form.direccion : ''}
              />
              <br />
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <br />
              <DatePicker
                className="form-control"
                selected={this.state.form ? this.state.form.fechaNacimiento : null}
                onChange={this.handleDateChange}
                dateFormat="dd/MM/yyyy"
              />
              <br />
              <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
              <br />
              <DatePicker
                className="form-control"
                selected={this.state.form ? this.state.form.fechaIngreso : null}
                onChange={this.handleDateChanger}
                dateFormat="dd/MM/yyyy"
              />
              <br />
              <label htmlFor="nombrePadre">Nombre del Padre</label>
              <input
                className="form-control"
                type="text"
                name="nombrePadre"
                id="nombrePadre"
                onChange={this.handleChange}
                value={form ? form.nombrePadre : ''}
              />
              <br />
              <label htmlFor="nombreMadre">Nombre de la Madre</label>
              <input
                className="form-control"
                type="text"
                name="nombreMadre"
                id="nombreMadre"
                onChange={this.handleChange}
                value={form ? form.nombreMadre : ''}
              />
              <br />
              <label htmlFor="encargado">Encargado</label>
              <input
                className="form-control"
                type="text"
                name="encargado"
                id="encargado"
                onChange={this.handleChange}
                value={form ? form.encargado : ''}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === 'insertar' ? (
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
             Estás seguro que deseas eliminar al estudiante {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
