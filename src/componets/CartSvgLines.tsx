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
  spouses: string[];
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

// const CartSvgLines: React.FC<CartSvgLinesProps> = ({ people, connections }) => {
//   const CARD_HEIGHT = 300;
//   const CONNECTION_OFFSET = 30;
//   const STROKE_WIDTH = 2.5;

//   // Группируем соединения по connectionId
//   const connectionGroups: Record<string, Connection[]> = {};
//   connections.forEach(connection => {
//     if (!connectionGroups[connection.connectionId]) {
//       connectionGroups[connection.connectionId] = [];
//     }
//     connectionGroups[connection.connectionId].push(connection);
//   });

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

//         // Y-точки соединения (middleY)
//         const connectYParent = baseYParent + CONNECTION_OFFSET; // down
//         const connectYChild = baseYChild - CONNECTION_OFFSET; // up

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
//             {/* Связи для родителей */}
//             {parents.length > 0 && (
//               <>
//                 {/* Горизонтальная линия для родителей, если >1 */}
//                 {parents.length > 1 && (
//                   <line
//                     x1={minXParent}
//                     y1={connectYParent}
//                     x2={maxXParent}
//                     y2={connectYParent}
//                     stroke="red"
//                     strokeWidth={STROKE_WIDTH}
//                   />
//                 )}

//                 {/* Вертикальные отводы от каждого родителя к горизонтальной (или просто вниз, если 1) */}
//                 {parents.map(parent => (
//                   <line
//                     key={`parent-drop-${parent.id}`}
//                     x1={parent.x}
//                     y1={baseYParent}
//                     x2={parent.x}
//                     y2={parents.length > 1 ? connectYParent : connectYParent}
//                     stroke="blue"
//                     strokeWidth={STROKE_WIDTH}
//                   />
//                 ))}
//               </>
//             )}

//             {/* Связи для детей */}
//             {children.length > 0 && (
//               <>
//                 {/* Горизонтальная линия для детей, если >1 */}
//                 {children.length > 1 && (
//                   <line
//                     x1={minXChild}
//                     y1={connectYChild}
//                     x2={maxXChild}
//                     y2={connectYChild}
//                     stroke="#7986CB"
//                     strokeWidth={STROKE_WIDTH}
//                   />
//                 )}

//                 {/* Вертикальные отводы от каждого ребёнка к горизонтальной (или просто вверх, если 1) */}
//                 {children.map(child => (
//                   <line
//                     key={`child-drop-${child.id}`}
//                     x1={child.x}
//                     y1={baseYChild}
//                     x2={child.x}
//                     y2={children.length > 1 ? connectYChild : connectYChild} // Для 1 — просто вверх
//                     stroke="blue"
//                     strokeWidth={STROKE_WIDTH}
//                   />
//                 ))}
//               </>
//             )}

//             {/* Центральная соединяющая линия (вертикальная или наклонная) */}
//             <path
//               d={`M${midXParent},${connectYParent} L${midXChild},${connectYChild}`}
//               stroke="green"
//               strokeWidth={STROKE_WIDTH}
//               fill="none"
//               markerEnd="url(#arrowhead)"
//             />
//           </React.Fragment>
//         );
//       })}
//     </svg>
//   );
// };
const CartSvgLines: React.FC<CartSvgLinesProps> = ({ people, connections, scale }) => {
  const CARD_HEIGHT = 300;
  const CONNECTION_OFFSET = 30;
  const STROKE_WIDTH = 2.5;

  // Разделяем связи по типам
  const parentChildConnections = connections.filter(conn => conn.type === 'parent-child');
  const spouseConnections = connections.filter(conn => conn.type === 'spouse');

  // Группируем родительско-детские связи по connectionId
  const connectionGroups: Record<string, Connection[]> = {};
  parentChildConnections.forEach(connection => {
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
        
        {/* Маркер для супружеских связей */}
        <marker 
          id="spouse-dot" 
          markerWidth="8" 
          markerHeight="8" 
          refX="4" 
          refY="4"
        >
          <circle cx="4" cy="4" r="3" fill="#FF6B6B" />
        </marker>
      </defs>

      {/* 1. Отрисовываем супружеские связи */}
      {spouseConnections.map(connection => {
        const person1 = people.find(p => p.id === connection.parentId);
        const person2 = people.find(p => p.id === connection.childId);
        
        if (!person1 || !person2) return null;

        const y1 = person1.y;
        const y2 = person2.y;

        return (
          <path
            key={connection.id}
            d={`M${person1.x},${y1} L${person2.x},${y2}`}
            stroke="#FF6B6B"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            markerMid="url(#spouse-dot)" // точка посередине
          />
        );
      })}

      {/* 2. Отрисовываем родительско-детские связи */}
      {Object.entries(connectionGroups).map(([connectionId, group]) => {
        if (group.length < 1) return null;

        const parentIds = new Set(group.map(c => c.parentId));
        const childIds = new Set(group.map(c => c.childId));

        const parents = people.filter(p => parentIds.has(p.id));
        const children = people.filter(p => childIds.has(p.id));

        if (parents.length === 0 || children.length === 0) return null;

        const parentY = parents[0].y;
        const childY = children[0].y;

        const baseYParent = parentY + CARD_HEIGHT / 2;
        const baseYChild = childY - CARD_HEIGHT / 2;

        const connectYParent = baseYParent + CONNECTION_OFFSET;
        const connectYChild = baseYChild - CONNECTION_OFFSET;

        const minXParent = Math.min(...parents.map(p => p.x));
        const maxXParent = Math.max(...parents.map(p => p.x));
        const midXParent = (minXParent + maxXParent) / 2;

        const minXChild = Math.min(...children.map(c => c.x));
        const maxXChild = Math.max(...children.map(c => c.x));
        const midXChild = (minXChild + maxXChild) / 2;

        return (
          <React.Fragment key={`connection-group-${connectionId}`}>
            {/* Связи для родителей */}
            {parents.length > 0 && (
              <>
                {parents.length > 1 && (
                  <line
                    x1={minXParent}
                    y1={connectYParent}
                    x2={maxXParent}
                    y2={connectYParent}
                    stroke="red"
                    strokeWidth={STROKE_WIDTH}
                  />
                )}
                {parents.map(parent => (
                  <line
                    key={`parent-drop-${parent.id}`}
                    x1={parent.x}
                    y1={baseYParent}
                    x2={parent.x}
                    y2={connectYParent}
                    stroke="blue"
                    strokeWidth={STROKE_WIDTH}
                  />
                ))}
              </>
            )}

            {/* Связи для детей */}
            {children.length > 0 && (
              <>
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
                {children.map(child => (
                  <line
                    key={`child-drop-${child.id}`}
                    x1={child.x}
                    y1={baseYChild}
                    x2={child.x}
                    y2={connectYChild}
                    stroke="blue"
                    strokeWidth={STROKE_WIDTH}
                  />
                ))}
              </>
            )}

            {/* Центральная соединяющая линия с стрелкой */}
            <path
              d={`M${midXParent},${connectYParent} L${midXChild},${connectYChild}`}
              stroke="green"
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