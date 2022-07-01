import { Button, StyleSheet, Text, View, Image} from 'react-native';
import { useState, useEffect } from 'react'
import api from '../../services/api';
import bgImg from "../../images/shot1.png";

export const Game = () => {

    const [playerCards, setPlayerCards] = useState([{
        cartas: {
            valor: undefined,
            img: undefined
        }
    }]);

    const [card, setCard] = useState([]);
    const [playerPoints, setPlayerPoints] = useState([]);
    const [total, setTotal] = useState(null);
    const [click, setClick] = useState(false);

    const handlePlayer = () =>{
        
        card.map(cards => {
            handleValor(),
                setPlayerCards([...playerCards, {
                    cartas: {
                        valor: cards.value,
                        img: cards.images.png
                    }
                }]),
            setPlayerPoints([...playerPoints, parseInt(cards.value)]);
        })
        if (playerCards.indexOf(undefined)) {
            playerCards.shift();
        }
    }

    const getCards = async () => {
        const { data } = await api.get(`new/draw/?count=1`);
        setCard(data.cards);
        handlePlayer();
        setClick(true);
    }


    const handleValor = () => {
        card.map(cards => {
            if (isNaN(cards.value)) {
                return cards.value = parseInt(10)
            }
            else {
                return parseInt(cards.value);
            }
        })
    }
    
    const somaValor = () => {
        setTotal(playerPoints.reduce(function (a, b) { return a + b}, 0))
        if (total > 30) {
            alert("SHOT TIME !!! 😜")
        }
        setClick(false)
    }

    const handleParar = () => {
        if (total > 30) {
            alert("SHOT TIME !!! 😜")
        }
      
    }

    useEffect(() => {
      somaValor();
   }, [playerPoints]);

   return (
    <View style={styles.container}>
        {playerCards && <Text style={{paddingTop: '5%', fontSize: 30, color: 'red'}}>PONTOS: {total}</Text>}
                        <Text style={{paddingTop: '5%', fontSize:15, color : 'white'}}>!!! Passou de 30 Pontos ? Shot Time !!! </Text>
        <View style={{ flex: 4, justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
            {playerCards.map(card => {
                return (
                    <Image style={styles.card} source={{ uri: card.cartas.img }} />
                )
            })}
        </View>
            <Button title='Pegar carta' onPress={getCards}></Button> 
           
        
    </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    card: {
      shadowRadius: 3,
      margin: 10,
      height: 150,
      width: 100,
      borderRadius: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
  });