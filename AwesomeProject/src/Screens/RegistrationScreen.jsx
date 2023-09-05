import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { removeData, storeData } from "../asyncStorage/AsyncStorage";

export default function RegistrationScreen({ navigation }) {
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(true);

  const handleLoginFocus = () => {
    setLoginFocused(true);
  };

  const handleLoginBlur = () => {
    setLoginFocused(false);
  };
  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    validateEmail(email);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };
  const form = {
    login,
    email,
    password,
  };

  const validateEmail = (text) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = emailRegex.test(text);
    setEmailValid(isValid);
  };

  const handleSubmit = async () => {
    validateEmail(email);
    if (isEmailValid) {
      // console.log(form);
      // navigation.navigate("Home");
      let loginStatus = {
        status: "hello",
      };
      await storeData(loginStatus);
      // await removeData();
    } else {
      console.log("Введіть пошту у форматі abcd@mail.com");
    }
  };
  const showPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../images/bg_img.jpg")}
        >
          <View style={styles.formWrap}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <TouchableOpacity style>
                  <Image
                    style={styles.addBtnImg}
                    source={require("../images/add_btn.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={[
                    styles.input,
                    isLoginFocused ? activeInputBorder : null,
                    isLoginFocused ? activeInputBackground : null,
                  ]}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  value={login}
                  onFocus={handleLoginFocus}
                  onBlur={handleLoginBlur}
                  onChangeText={setLogin}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={[
                    styles.input,
                    isEmailFocused ? activeInputBorder : null,
                    isEmailFocused ? activeInputBackground : null,
                  ]}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  value={email}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </KeyboardAvoidingView>
              {!isEmailValid && (
                <Text style={styles.errorText}>
                  Введіть пошту у форматі abcd@mail.com
                </Text>
              )}
              <View style={styles.passwordWrap}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <TextInput
                    style={[
                      styles.input,
                      isPasswordFocused ? activeInputBorder : null,
                      isPasswordFocused ? activeInputBackground : null,
                    ]}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    value={password}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChangeText={setPassword}
                    secureTextEntry={isPasswordShow}
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={showPassword}
                >
                  <Text style={styles.toggleButtonText}>Показати</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <View style={styles.linkWrap}>
                <Text style={styles.linkText}>Вже є акаунт?</Text>
                <TouchableOpacity
                  style
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("LoginScreen");
                  }}
                >
                  <Text style={styles.linkText}> Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    marginHorizontal: 16,
    paddingBottom: 45,
  },

  formWrap: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarWrap: {
    position: "absolute",
    left: "35%",
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "relative",
  },
  addBtnImg: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 81,
    left: 105,
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    paddingLeft: 16,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 27,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
  },
  linkWrap: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    color: "#1B4371",
  },
  passwordWrap: {
    position: "relative",
    justifyContent: "center",
  },
  toggleButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  toggleButtonText: {
    color: "#1B4371",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
});

const activeInputBorder = {
  borderColor: "#FF6C00",
};

const activeInputBackground = {
  backgroundColor: "#FFFFFF",
};