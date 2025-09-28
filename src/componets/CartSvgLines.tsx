// import React from "react";

// interface Person {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   dateAge: string;
//   age: number;
//   description: string;
//   avatarUrl: string;
//   galleryUrl: string[];
//   connectionGroup: string[];
//   x: number;
//   y: number;
// }

// interface Connection {
//   parentId: string;
//   childId: string;
//   connectionId: string;
//   x: number;
//   y: number;
// }

// interface CartSvgLinesProps {
//   people: Person[];
//   connections: Connection[];
//   scale: number;
// }

// const CartSvgLines: React.FC<CartSvgLinesProps> = ({ people, connections, scale }) => {
//   // Константы для размеров и отступов
//   const CARD_HEIGHT = 300;
//   const CONNECTION_OFFSET = 30; // Уменьшил для компактности, было 50 — подкорректируй визуально
//   const STROKE_WIDTH = 2.5; // Базовая толщина

//   // Группируем соединения по connectionId
//   const connectionGroups: Record<string, Connection[]> = {};
//   connections.forEach(connection => {
//     if (!connectionGroups[connection.connectionId]) {
//       connectionGroups[connection.connectionId] = [];
//     }
//     connectionGroups[connection.connectionId].push(connection);
//   });

//   // Функция для создания П-образного пути
//   const createUShapePath = (
//     startX: number, 
//     endX: number, 
//     baseY: number,
//     direction: 'up' | 'down'
//   ) => {
//     const offset = direction === 'up' ? -CONNECTION_OFFSET : CONNECTION_OFFSET;
//     const middleY = baseY + offset;
//     return `M${startX},${baseY} 
//             L${startX},${middleY} 
//             L${endX},${middleY} 
//             L${endX},${baseY}`;
//   };

//   return (
//     <svg
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//         zIndex: 100,
//         overflow: 'visible'
//       }}
//     >
//       <defs>
//         <marker 
//           id="arrowhead" 
//           markerWidth="10" 
//           markerHeight="7" 
//           refX="9" 
//           refY="3.5" 
//           orient="auto"
//         >
//           <polygon points="0 0, 10 3.5, 0 7" fill="#4ECDC4" />
//         </marker>
//       </defs>

//       {/* Отрисовываем связи для каждой группы */}
//       {Object.entries(connectionGroups).map(([connectionId, group]) => {
//         if (group.length < 1) return null;

//         // Получаем уникальных родителей и детей
//         const parentIds = new Set(group.map(c => c.parentId));
//         const childIds = new Set(group.map(c => c.childId));

//         const parents = people.filter(p => parentIds.has(p.id));
//         const children = people.filter(p => childIds.has(p.id));

//         if (parents.length === 0 || children.length === 0) return null;

//         // Предполагаем, что все родители/дети на одном уровне Y
//         const parentY = parents[0].y;
//         const childY = children[0].y;

//         // Базовые Y для bottom родителей и top детей
//         const baseYParent = parentY + CARD_HEIGHT / 2;
//         const baseYChild = childY - CARD_HEIGHT / 2;

//         // Смещения для U
//         const offsetParent = CONNECTION_OFFSET;
//         const offsetChild = -CONNECTION_OFFSET; // Отрицательное для up

//         // Y-точки соединения (middleY)
//         const connectYParent = baseYParent + offsetParent;
//         const connectYChild = baseYChild + offsetChild;

//         // Min/max/mid X для родителей
//         const minXParent = Math.min(...parents.map(p => p.x));
//         const maxXParent = Math.max(...parents.map(p => p.x));
//         const midXParent = (minXParent + maxXParent) / 2;

//         // Min/max/mid X для детей
//         const minXChild = Math.min(...children.map(c => c.x));
//         const maxXChild = Math.max(...children.map(c => c.x));
//         const midXChild = (minXChild + maxXChild) / 2;

//         return (
//           <React.Fragment key={`connection-group-${connectionId}`}>
//             {/* U-связь для родителей, если >1 */}
//             {parents.length > 1 && (
//               <path
//                 d={createUShapePath(minXParent, maxXParent, baseYParent, 'down')}
//                 stroke="#FF6B6B"
//                 strokeWidth={STROKE_WIDTH / scale}
//                 fill="none"
//               />
//             )}

//             {/* U-связь для детей, если >1 */}
//             {children.length > 1 && (
//               <path
//                 d={createUShapePath(minXChild, maxXChild, baseYChild, 'up')}
//                 stroke="#7986CB"
//                 strokeWidth={STROKE_WIDTH / scale}
//                 fill="none"
//               />
//             )}

//             {/* Центральная соединяющая линия (вертикальная или наклонная) */}
//             <path
//               d={`M${midXParent},${connectYParent} L${midXChild},${connectYChild}`}
//               stroke="#4ECDC4"
//               strokeWidth={STROKE_WIDTH / scale}
//               fill="none"
//               markerEnd="url(#arrowhead)"
//             />
//           </React.Fragment>
//         );
//       })}
//     </svg>
//   );
// };

// export default CartSvgLines;
import React from "react";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateAge: string;
  age: number;
  description: string;
  avatarUrl: string;
  galleryUrl: string[];
  x: number;
  y: number;
  parents: string[];
  children: string[];
  connectionGroup: string;
}

interface Connection {
  id: string;
  parentId: string;
  childId: string;
  connectionId: string;
  x: number;
  y: number;
}

interface CartSvgLinesProps {
  people: Person[];
  connections: Connection[];
  scale: number;
}

const CartSvgLines: React.FC<CartSvgLinesProps> = ({ people, connections }) => {
  const CARD_HEIGHT = 300;
  const CONNECTION_OFFSET = 30;
  const STROKE_WIDTH = 2.5;

  // Группируем соединения по connectionId
  const connectionGroups: Record<string, Connection[]> = {};
  connections.forEach(connection => {
    if (!connectionGroups[connection.connectionId]) {
      connectionGroups[connection.connectionId] = [];
    }
    connectionGroups[connection.connectionId].push(connection);
  });

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
        overflow: 'visible'
      }}
    >
      <defs>
        <marker 
          id="arrowhead" 
          markerWidth="10" 
          markerHeight="7" 
          refX="9" 
          refY="3.5" 
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4ECDC4" />
        </marker>
      </defs>

      {/* Отрисовываем связи для каждой группы */}
      {Object.entries(connectionGroups).map(([connectionId, group]) => {
        if (group.length < 1) return null;

        // Получаем уникальных родителей и детей
        const parentIds = new Set(group.map(c => c.parentId));
        const childIds = new Set(group.map(c => c.childId));

        const parents = people.filter(p => parentIds.has(p.id));
        const children = people.filter(p => childIds.has(p.id));

        if (parents.length === 0 || children.length === 0) return null;

        // Предполагаем, что все родители/дети на одном уровне Y
        const parentY = parents[0].y;
        const childY = children[0].y;

        // Базовые Y для bottom родителей и top детей
        const baseYParent = parentY + CARD_HEIGHT / 2;
        const baseYChild = childY - CARD_HEIGHT / 2;

        // Y-точки соединения (middleY)
        const connectYParent = baseYParent + CONNECTION_OFFSET; // down
        const connectYChild = baseYChild - CONNECTION_OFFSET; // up

        // Min/max/mid X для родителей
        const minXParent = Math.min(...parents.map(p => p.x));
        const maxXParent = Math.max(...parents.map(p => p.x));
        const midXParent = (minXParent + maxXParent) / 2;

        // Min/max/mid X для детей
        const minXChild = Math.min(...children.map(c => c.x));
        const maxXChild = Math.max(...children.map(c => c.x));
        const midXChild = (minXChild + maxXChild) / 2;

        return (
          <React.Fragment key={`connection-group-${connectionId}`}>
            {/* Связи для родителей */}
            {parents.length > 0 && (
              <>
                {/* Горизонтальная линия для родителей, если >1 */}
                {parents.length > 1 && (
                  <line
                    x1={minXParent}
                    y1={connectYParent}
                    x2={maxXParent}
                    y2={connectYParent}
                    stroke="#FF6B6B"
                    strokeWidth={STROKE_WIDTH}
                  />
                )}

                {/* Вертикальные отводы от каждого родителя к горизонтальной (или просто вниз, если 1) */}
                {parents.map(parent => (
                  <line
                    key={`parent-drop-${parent.id}`}
                    x1={parent.x}
                    y1={baseYParent}
                    x2={parent.x}
                    y2={parents.length > 1 ? connectYParent : connectYParent}
                    stroke="#FF6B6B"
                    strokeWidth={STROKE_WIDTH}
                  />
                ))}
              </>
            )}

            {/* Связи для детей */}
            {children.length > 0 && (
              <>
                {/* Горизонтальная линия для детей, если >1 */}
                {children.length > 1 && (
                  <line
                    x1={minXChild}
                    y1={connectYChild}
                    x2={maxXChild}
                    y2={connectYChild}
                    stroke="#7986CB"
                    strokeWidth={STROKE_WIDTH}
                  />
                )}

                {/* Вертикальные отводы от каждого ребёнка к горизонтальной (или просто вверх, если 1) */}
                {children.map(child => (
                  <line
                    key={`child-drop-${child.id}`}
                    x1={child.x}
                    y1={baseYChild}
                    x2={child.x}
                    y2={children.length > 1 ? connectYChild : connectYChild} // Для 1 — просто вверх
                    stroke="#7986CB"
                    strokeWidth={STROKE_WIDTH}
                  />
                ))}
              </>
            )}

            {/* Центральная соединяющая линия (вертикальная или наклонная) */}
            <path
              d={`M${midXParent},${connectYParent} L${midXChild},${connectYChild}`}
              stroke="red"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default CartSvgLines;