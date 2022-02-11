import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { Button } from "components/common/Button";
import Input from "components/common/Input";
import { setUser } from "stores/user";
import { useDispatch } from "react-redux";
import dance from "assets/images/dance.png";
import logo from "assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");

  const onInputName = (e: any) => {
    setName(e.target.value);
  };
  const onEnter = (e: FormEvent) => {
    const body = {
      userName: name,
      userId: Math.random(),
      profileImage:
        "https://i.ibb.co/vmy2PYq/83fc4c6dca8298dc8e03ba63d35a9cae.jpg",
    };
    dispatch(setUser(body));

    if (name !== "") {
      navigate("/main");
    } else {
      alert("이름을 입력해주세요!");
    }
  };

  return (
    <Container>
      <Content>
        <Logo src={logo} alt="logo" />
        <h1>
          업무 최적화를 돕는
          <br />
          Work OS 올인원 협업툴
        </h1>
        <DanceImg src={dance} alt="dance-image" />
        <StyledInput
          width={"260px"}
          height={"40px"}
          onChange={onInputName}
          placeholder="이름을 입력하세요"
        />
        <Button variant={"secondary"} width={"260px"} onClick={onEnter}>
          입장
        </Button>
      </Content>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  text-align: center;
  width: 420px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 10%);

  h1 {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.text};
    color: ${({ theme }) => theme.colors.main};
    margin-bottom: 25px;
  }
`;

const Logo = styled.img`
  width: 140px;
  margin-bottom: 15px;
`;
const DanceImg = styled.img`
  border-radius: 15px;
  width: 260px;
  margin-bottom: 30px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;
