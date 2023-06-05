import React from "react";
import { renderToString } from "react-dom/server";

type IRenderMessage = {
	login: string
	password: string
	email: string
};

const RegisterMessage = ({ login, password, email }: IRenderMessage) => {
	return (
		<div className="email" style={{ width: 470, background: "#FAFAFA", textAlign: "center", position: "relative", zIndex: 10 }}>
			<div className="email__title" style={{ padding: 50 }}>
				<p style={{ width: "100%", fontSize: 20, margin: "auto" }}>TextEditor</p>
		  	</div>
		  <div className="email__body">
		    <p style={{ fontSize: 24, fontWeight: 400, maxWidth: 570, lineHeight: "150%", margin: "auto", marginTop: 60 }}>
		      Добро пожаловать в<br /> TextEditor, <strong>{login}</strong>
		    </p>
		    <div className="email__login-data" style={{ textAlign: "center", margin: "auto", marginTop: 80 }}>
		      <p style={{ fontSize: 22 }}>
		        <strong>Ваши данные для входа</strong>
		      </p>
		      <p style={{ fontSize: 18 }}>
		        <strong>Почта:</strong> {email}
		      </p>
		      <p style={{ fontSize: 18 }}>
		        <strong>Пароль:</strong> {password}
		      </p>
		    </div>
		  </div>
		  <div className="email__footer" style={{ padding: 20, maxWidth: 560, margin: "auto", marginTop: 60 }} >
		    <p style={{ margin: "auto", paddingBottom: 30 }}>
		      <a
		        style={{ fontSize: 20, background: "#303030", borderRadius: 67, color: "white", padding: "20px 40px", border: "none", cursor: "pointer", textDecoration: "none" }}
		        href="http://localhost"
		      >
		        Войти в акаунт
		      </a>
		    </p>
		    <p style={{ fontSize: 14, color: "#636363", lineHeight: "150%" }}>
		      Если вы не регистрировались на сайте text-editor.io, то просто
		      проигнорируйте это сообщение
		    </p>
		  </div>
		</div>
	);
};

export const renderRegisterMessage = (login: string, email: string, password: string): string => {
	return renderToString(<RegisterMessage login={login} email={email} password={password} />)
}