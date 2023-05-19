import { useStore } from "effector-react";
import { $isLogin, setIsLogin } from "./store";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const AuthController = () => {
	const navigate = useNavigate();

	const isLogin = useStore($isLogin);

	useEffect(() => {
		if (isLogin) {
            navigate("/");
        }

		if (!isLogin) {
			navigate("/login");
		}
	}, [isLogin, navigate])


	return null;
};

export {
	AuthController,
	$isLogin,
	setIsLogin
}