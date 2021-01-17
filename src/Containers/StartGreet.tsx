import { ChoosenPerson as Greet } from "../Styles";


const StartGreet = ({isPlaceholder}: {isPlaceholder?: boolean}) => {
    return (
        <Greet placeHolder={isPlaceholder}>Hello on the chat App! Feel free to test it out</Greet>
    )
}

export default StartGreet
