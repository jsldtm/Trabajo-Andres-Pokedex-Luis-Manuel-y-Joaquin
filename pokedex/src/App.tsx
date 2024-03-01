import React,{ PureComponent } from 'react';
import './Pokedex.css';
import Button from './components/Button';
import axios from 'axios';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';






function Pokedex() {
  const [contador, setContador]= React.useState(1);
  const [pokemon, setPokemon]= React.useState({});
  const [habilidades, setHabilidades]= React.useState([]);
  const [imagen, setImagen]= React.useState('');
  const [nombre, setNombre]= React.useState('');
  const [tipo, setTipo]= React.useState('');
  const [peso, setPeso]= React.useState('');
  const [altura, setAltura]= React.useState('');
  const [experiencia, setExperiencia]= React.useState('');
  const [vida, setVida]= React.useState('');
  const [ataque, setAtaque]= React.useState('');
  const [defensa, setDefensa]= React.useState('');
  const [ataqueEspecial, setAtaqueEspecial]= React.useState('');
  const [defensaEspecial, setDefensaEspecial]= React.useState('');
  const [velocidad, setVelocidad]= React.useState('');
  const [nombreHabilidad, setNombreHabilidad]= React.useState('');;
  const [games , setGames] = React.useState([]);

  
  const loadData =  () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${contador}`)
      .then((res) => {
        setPokemon(res.data);
        setImagen(res.data.sprites.front_default);
        setNombre(res.data.name);
        setTipo(res.data.types[0].type.name);
        setPeso(res.data.weight);
        setAltura(res.data.height);
        setExperiencia(res.data.base_experience);
        setVida(res.data.stats[0].base_stat);
        setAtaque(res.data.stats[1].base_stat);
        setDefensa(res.data.stats[2].base_stat);
        setAtaqueEspecial(res.data.stats[3].base_stat);
        setDefensaEspecial(res.data.stats[4].base_stat);
        setVelocidad(res.data.stats[5].base_stat);
        setHabilidades(res.data.abilities);
        setNombreHabilidad(res.data.abilities[0].ability.name);
        setGames(res.data.game_indices);
      }
      )
  }
  useEffect(() => {
    loadData();
  }, [contador]);

  function aumentar(){
    setContador(contador+1);
    console.log(contador);
  }
  function disminuir(){
    if (contador<=1){
      setContador(1)

    }
    else
    {  
      setContador(contador-1);
    }
    console.log(contador);
  }

  function mostrarHabilidad(){
    return habilidades.map((habilidad:any, index:number)=>{
      return(
        <li key={index}>{habilidad.ability.name}</li>
      )
    })
  }
  
  const state = {
    options: {
      labels: ['Vida', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'],
      title: {
        text: 'Estadísticas'
      }
    }
  }
  const series = [
    {
      name: 'Estadísticas',
      data: [
        { x: 'Vida', y: parseFloat(vida) },
        { x: 'Ataque', y: parseFloat(ataque) },
        { x: 'Defensa', y: parseFloat(defensa) },
        { x: 'Ataque Especial', y: parseFloat(ataqueEspecial) },
        { x: 'Defensa Especial', y: parseFloat(defensaEspecial) },
        { x: 'Velocidad', y: parseFloat(velocidad) },
      ],
    },
  ];



    return (
        <div id="contenedor-grande">
            <div id="contenedor-principal">
                <div id="pokedex">
                    <div id="circle-top"></div>
                    <div style={{ display: 'flex' }}>
                        <div id="miniTopcircle-one"></div>
                        <div id="miniTopcircle-dos"></div>
                        <div id="miniTopcircle-tres"></div>
                    </div>
                    <div id="imagen-pokemon">

                        <img src={imagen}width="55%" height="55%"></img>

                    </div>
                    <div id="informacion-pokemon">
                        <h1> ID Pokemon {contador}</h1>
                        <h1>Nombre: {nombre}</h1>
                        <p>
                            Tipo: {tipo}
                        </p>
                        <ul>
                            <li>Peso: {peso}</li>
                            <li>Altura: {altura}</li>
                            <li>Experiencia: {experiencia}</li>
                            <li>Vida: {vida}</li>
                            <li>Ataque: {ataque}</li>
                            <li>Defensa: {defensa}</li>
                            <li>Ataque Especial: {ataqueEspecial}</li>
                            <li>Defensa Especial: {defensaEspecial}</li>
                            <li>Velocidad: {velocidad}</li>
                        </ul>
                    </div>
                    <div id="botones">
                      <Button onClick={aumentar} label="Aumentar" color='blue'></Button>
                      <Button onClick={disminuir} label="Disminuir" color='red'></Button>

                    </div>
                    <div id="circle-bottom"></div>
                </div>
                <div id="caja-derecha">
                    <div id="imagen-habilidades">
             
                    <h2>Más información</h2>
                    <Chart 
                    options={state.options}
                    series={series}
                    type="radar"
                    width="100%"
                    height="100%"
                    />

                     
          
                    </div>
                    <div id="informacion-habilidades">
                      <h1>Habilidades</h1>
                      <ul>
                        {mostrarHabilidad()}
                      </ul>
                      <h1>
                        Juegos
                      </h1>
                      <ul>
                        {games.map((game:any, index:number)=>{
                          return(
                            <li key={index}>{game.version.name}</li>
                          )
                        })}
                        
                      </ul>
                    </div>

                        

                      
                    
                </div>
            </div>
        </div>





                   


              
                    
               
    
    );
}


export default Pokedex;



