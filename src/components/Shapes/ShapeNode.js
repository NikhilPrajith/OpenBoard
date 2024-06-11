import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import { NodeResizer } from 'reactflow';
import { useBoard } from '@/context/BoardContext';

const selectableColors = [
  "#fef071",
  "#5cf1c0",
  "#ffcdcd",
  "#e5bbf7",
  "#a3d3f9",
  "#ffffff",
  "#d3d3d3", // Light black
];

const ShapeNode = ({ id, data, selected }) => {
  const [color, setColor] = useState(data.color || selectableColors[0]);
  const [size, setSize] = useState({ width: data.width || 130, height: data.height || 130 });
  const { setIsSavedBoard } = useBoard();

  useEffect(() => {
    data.style = { ...data.style, fill: color };
    data.width = size.width;
    data.height = size.height;
  }, [color, size, data]);

  const handleColorChange = (color) => {
    setColor(color.hex);
    data.color = color.hex;
    setIsSavedBoard(false);
  };

  const handleResize = (newSize) => {
    setSize(newSize);
    data.width = newSize.width;
    data.height = newSize.height;
    setIsSavedBoard(false);
  };

  const getShape = () => {
    const commonProps = { fill: color, stroke:'#000', strokeWidth:1 };
    const { width, height } = size;
    switch (data.shape) {
      case 'rectangle':
        return <rect {...commonProps} width={width} height={height} />;
      case 'roundedRectangle':
        return <rect {...commonProps} width={width} height={height} rx="15" ry="15" />;
      case 'circle':
        const radius = Math.min(width, height) / 2;
        return <circle {...commonProps} cx={width / 2} cy={height / 2} r={radius} />;
      case 'diamond':
        return <polygon {...commonProps} points={`${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`} />;
      case 'triangle':
        return <polygon {...commonProps} points={`${width / 2},0 ${width},${height} 0,${height}`} />;
      case 'trapezoid':
        return <polygon {...commonProps} points={`${width / 4},0 ${3 * width / 4},0 ${width},${height} 0,${height}`} />;
      case 'cross':
        return (
          <g {...commonProps}>
            <rect x={(width * 2) / 5} y={0} width={width / 5} height={height} />
            <rect x={0} y={(height * 2) / 5} width={width} height={height / 5} />
          </g>
        );
      case 'hexagon':
        return <polygon {...commonProps} points={`${width / 4},0 ${3 * width / 4},0 ${width},${height / 2} ${3 * width / 4},${height} ${width / 4},${height} 0,${height / 2}`} />;
      case 'parallelogram':
        return <polygon {...commonProps} points={`${width / 4},0 ${width},0 ${3 * width / 4},${height} 0,${height}`} />;
      case 'cylinder':
        return (
          <>
            <ellipse cx={width / 2} cy={height / 10} rx={width / 2} ry={height / 10} fill={color} />
            <rect x={0} y={height / 10} width={width} height={height * 0.8} fill={color} />
            <ellipse cx={width / 2} cy={height * 0.9} rx={width / 2} ry={height / 10} fill={color} />
          </>
        );
      case 'star':
        return <polygon {...commonProps} points="50,15 61,35 85,35 67,50 72,72 50,60 28,72 33,50 15,35 39,35" />;
      case 'heart':
        return <path {...commonProps} d="M50 30
          A 20 20, 0, 1, 1, 90 30
          Q 90 60, 50 90
          Q 10 60, 10 30
          A 20 20, 0, 1, 1, 50 30 z" />;
      default:
        return <rect {...commonProps} width={width} height={height} />;
    }
  };

  const shapeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
  };

  return (
    <>
      <NodeResizer
        isVisible={selected}
        onResize={(event, params) => handleResize({ width: params.width, height: params.height })}
        minWidth={50}
        minHeight={50}
        style={{ border: 'none' }}
        color="#000"
      />
      <div style={{ ...shapeStyle, width: size.width, height: size.height }}>
        <svg width="100%" height="100%">
          {getShape()}
        </svg>
        {/* Commenting out the label section for now */}
        {/* <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          textAlign: 'center',
          color: '#000',
          fontSize: '12px',
        }}>
          {data.label}
        </div> */}
        {selected && (
          <div style={{ position: 'absolute', top: "-75px", right: 0, zIndex: 10 }}>
            <TwitterPicker
              triangle="hide"
              color={color}
              onChange={handleColorChange}
              colors={selectableColors}
              styles={{ default: { input: { display: 'none' }, hash: { display: 'none' } } }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ShapeNode;
