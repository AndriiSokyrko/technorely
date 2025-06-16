import {Button, ButtonGroup} from "react-bootstrap";
import {FaSortAlphaDown, FaSortAlphaUp} from "react-icons/fa";
import {useContext, useState} from "react";
import {Context} from "../index";

const Sort = () => {
    const [typeSort, setTypeSort] = useState('asc')
    const [nameSort, setNameSort] = useState(() => 'name')
    const {company} = useContext(Context)
    const handleSort = () => {
        typeSort === 'asc' ? setTypeSort('desc') : setTypeSort('asc')
        company.setNameSort(nameSort)
        company.setTypeSort(typeSort)
        company.setFlagRedrawCompany(2)
    }
    return (
        <ButtonGroup className="bg-dark border-black rounded-2">
            <Button
                    variant={"outline-light"}
                    onClick={() => handleSort()}
            >
                name
                {nameSort === 'name' && typeSort === 'asc' ? <FaSortAlphaUp/> : <FaSortAlphaDown/>}
            </Button>
            <Button
                    variant={"outline-light"}
                    onClick={() => handleSort()
                    }>
                service
                {nameSort === 'service' && typeSort !== 'asc' ? <FaSortAlphaUp/> : <FaSortAlphaDown/>}
            </Button>
            <Button
                    variant={"outline-light"}
                    onClick={() => handleSort()}>
                capital
                {nameSort === 'service' && typeSort !== 'asc' ? <FaSortAlphaUp/> : <FaSortAlphaDown/>}
            </Button>
        </ButtonGroup>
    );
};
export default Sort;