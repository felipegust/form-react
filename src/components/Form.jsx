import { useEffect, useState } from "react"

const Form = () => {
    const [form, SetForm] = useState({
        name: "",
        email: "",
        gender: ""
    });

    const [alert, SetAlert] = useState(false)
    const [emailMessage, SetEmailMessage] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // caso algum valor esteja vazio
        let alert = Object.values(form).some(v => v == "");
        SetAlert(alert)

        //verifica e-mail válido
        let validEmail = form["email"].toLowerCase().match(/[a-z]+@[a-z]+\.com(.br)*/)
        if (!validEmail) {
            SetEmailMessage(true)
        } else {
            SetEmailMessage(false)
        }

        //submete o form caso não haja problemas
        if(!alert && !emailMessage) {
            e.currentTarget.submit()
        }
    }

    const handleChange = (e) => {
        let newProp = form;
        newProp[e.target.name] = e.target.value
        SetForm({ ...newProp })
    }

    return (
        <div>
            <h1>Formulário de Cadastro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Nome: </label>
                <input type="text" onChange={(e) => handleChange(e)} name="name" placeholder="Digite o seu nome" />
                {(alert == true && form["name"] == "") ? <span className="alertMessage">Por favor, digite um nome</span> : ""}
                <br />
                <label>E-mail: </label>
                <input type="email" onChange={(e) => handleChange(e)} name="email" placeholder="Digite o seu e-mail" />
                {(alert == true && form["email"] == "") ? <span className="alertMessage">Por favor, digite um e-mail</span> : ""}
                {emailMessage ? <span className="alertMessage">Digite um e-mail válido</span> : ""}
                <br />
                <label>Gênero: </label>
                <select onChange={(e) => handleChange(e)} name="gender">
                    <option value={""}>-</option>
                    <option value={"M"}>M</option>
                    <option value={"F"}>F</option>
                </select>
                {(alert == true && form["gender"] == "") ? <span className="alertMessage">Por favor, selecione um gênero</span> : ""}
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>

    )

}

export default Form