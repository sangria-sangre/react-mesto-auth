function InfoTooltrip(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>

            <div className="popup__container" >
                <button className="popup__close-btn" type="button" onClick={props.isClose}></button>
                <img className="popup__register-image" 
                src={props.status ? require('../images/done.png') : require('../images/erorr.png')} alt="status-register" />
                <h2 className="popup__title popup__title_register">
                    {props.status ?
                        "Вы успешно зарегистрировались!" :
                        "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>

        </section>
    );
}

export default InfoTooltrip;