import {
    Container,
    EditItemButton,
    EditModal,
    EditModalBox,
    Navbar,
    NavbarItem,
} from "./styles";

import { useState, useEffect } from "react";

import standardMenu from './utils/standard_menu.json';
const MENU = "MENU";

function App() {
    const [isEditModalopened, setIsEditModalOpened] = useState<boolean>(false);
    const [itemToEditIndex, setItemToEditIndex] = useState<number>(0);
    const [newName, setNewName] = useState<string>("");
    const [menu, setMenu] = useState<any>([]);

    useEffect(() => {
        let menu = JSON.parse(localStorage.getItem(MENU)!);
        if (menu !== null) {
            setMenu(menu);
        } else {
            setMenu([{name: "Início",},{name: "Sobre nós",},{name: "Contato", },]);

            localStorage.setItem(MENU, JSON.stringify(standardMenu));
        }
    }, []);

    const handleEditButtonClick = (index: number) => {
        setNewName(menu[index].name);
        setIsEditModalOpened(true);
        setItemToEditIndex(index);
    };

    const handleItemNameChange = (e: any) => {
        setNewName(e.target.value);
    };

    const handleSaveButtonClick = () => {
        setIsEditModalOpened(false);
        setItemToEditIndex(0);
        setNewName("");

        menu[itemToEditIndex].name = newName;
        localStorage.setItem(MENU, JSON.stringify(menu));
    };
    const handleEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13) {
            setIsEditModalOpened(false);
            setItemToEditIndex(0);
            setNewName("");

            menu[itemToEditIndex].name = newName;
            localStorage.setItem(MENU, JSON.stringify(menu));
        }
    };

    return (
        <Container>
            <Navbar>
                {menu.map((menuItem: any, i: number) => (
                    <NavbarItem key={i}>
                        {menuItem.name}
                        <EditItemButton
                            contentEditable={false}
                            onClick={() => handleEditButtonClick(i)}
                        >
                            Editar
                        </EditItemButton>
                    </NavbarItem>
                ))}
            </Navbar>

            {isEditModalopened ? (
                <EditModal onKeyDown={(e: any) => handleEnterClick(e)}>
                    <EditModalBox>
                        <h2>
                            Digite qual o nome você quer atribuir a esse item do
                            menu
                        </h2>
                        <input
                            value={newName}
                            type="text"
                            required
                            autoFocus
                            onChange={(e) => handleItemNameChange(e)}
                        />
                        <button onClick={handleSaveButtonClick}>Salvar</button>
                    </EditModalBox>
                </EditModal>
            ) : null}
        </Container>
    );
}

export default App;
