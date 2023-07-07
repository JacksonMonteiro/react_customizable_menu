import {
    Container,
    EditItemButton,
    EditModal,
    EditModalBox,
    Navbar,
    NavbarItem,
} from "./styles";

import { useState, useEffect } from "react";

import standardMenu from "./utils/standard_menu.json";
import {
    SortableItem,
    SortableItemProps,
    SortableList,
} from "@thaddeusjiang/react-sortable-list";
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
            setMenu([
                { id: 1, name: "Início" },
                { id: 2, name: "Sobre nós" },
                { id: 3, name: "Contato" },
            ]);

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
    const handleSortItem = () => {
        console.log("Trocou o caralho do item")
    }

    return (
        <Container>
            {/* <Navbar>
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
            </Navbar> */}

            <Navbar>
                <SortableList items={menu} setItems={setMenu} onSort={handleSortItem}>
                    {({ items }: { items: SortableItemProps[] }) => (
                        <>
                            {items.map((item: SortableItemProps, index: number) => (
                                <SortableItem key={item.id} id={item.id}>
                                    <NavbarItem key={item.id}>
                                        {item.name}
                                        <EditItemButton
                                            contentEditable={false}
                                            onClick={() =>
                                                handleEditButtonClick(index)
                                            }
                                        >
                                            Editar
                                        </EditItemButton>
                                    </NavbarItem>
                                </SortableItem>
                            ))}
                        </>
                    )}
                </SortableList>
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
