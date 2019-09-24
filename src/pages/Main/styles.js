import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
`;

export const Logo = styled.Image`
  height: 150px;
  width: 150px;
  margin-top: 200px;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 50px;
  padding: 15px 0;
  align-items: center;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const Description = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 30px;
`;
