import {
    Container,
    EditItemButton,
    EditModal,
    EditModalBox,
    Navbar,
    NavbarItem,
} from "./styles";
import { useState } from "react";

function App() {
    const [isEditModalopened, setIsEditModalOpened] = useState<boolean>(false);
    const [itemToEditIndex, setItemToEditIndex] = useState<number>(0);
    const [newName, setNewName] = useState<string>("");
    const [menu, setMenu] = useState([
        {
            name: "Início",
        },
        {
            name: "Sobre nós",
        },
        {
            name: "Contato",
        },
    ]);

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
        menu[itemToEditIndex].name = newName;
        setItemToEditIndex(0);
        setNewName("");
    };
    const handleEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log("Método chamado");
        if (e.keyCode === 13) {
            setIsEditModalOpened(false);
            menu[itemToEditIndex].name = newName;
            setItemToEditIndex(0);
            setNewName("");
        }
    };

    return (
        <Container>
            <Navbar>
                {menu.map((menuItem: any, i) => (
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
