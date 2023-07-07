import {
    Container,
    EditItemButton,
    EditModal,
    EditModalBox,
    Navbar,
    NavbarItem,
} from "./styles";

import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import standardMenu from "./utils/standard_menu.json";
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

    const handleDrop = (droppedItem: any) => {
        if (!droppedItem.destination) return;
        let updatedList = [...menu];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        setMenu(updatedList);
        localStorage.setItem(MENU, JSON.stringify(updatedList));
    };

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
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="menu-container">
                        {(provided) => (
                            <div
                                className="menu-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {menu.map((item: any, index: any) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className="item-container"
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <NavbarItem key={item.id}>
                                                    {item.name}
                                                    <EditItemButton
                                                        contentEditable={false}
                                                        onClick={() =>
                                                            handleEditButtonClick(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </EditItemButton>
                                                </NavbarItem>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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
