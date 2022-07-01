import React, { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import { getDeckId } from "../../services/axiosClient";
import { styles } from "./styles";
import bgImg from "../../images/shot1.png";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [idDeck, setIdDeck] = useState(null);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const id = await getDeckId();
      setIdDeck(id);
      setLoading(false);
    };
    get();
  }, []);

  const inciarPartida = async () => {
    navigation.navigate("Game", {
      deckId: idDeck,
    });
  };

  return (
    <ImageBackground
    source={bgImg}
    style={styles.container}
    imageStyle={{ resizeMode: "auto", transform: [{ scale: 1.0 }] }}
  >
    <Text style={styles.title}>Shot Game</Text>
    <View style={{ flex: 2, justifyContent: "center", paddingTop: "25%" }}>
      <Button title="Iniciar " onPress={inciarPartida} />
      <Text style={styles.subtitle}>Teste sua Sorte</Text>
    </View>
  </ImageBackground>
  );
};
 


export default Home;
