-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2024 a las 10:41:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blogging`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL,
  `categoria_nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`categoria_id`, `categoria_nombre`) VALUES
(1, 'Entretenimiento-Ficción'),
(2, 'Literatura-Cuentos'),
(3, 'Aventuras'),
(4, 'Infantil-Familiar'),
(5, 'Cocina Peruana'),
(6, 'Lugares y Viajes'),
(7, 'Turismo'),
(8, 'Patrimonio Cultural');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `comentario_id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `persona_id` int(11) NOT NULL,
  `publicacion_id` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`comentario_id`, `contenido`, `persona_id`, `publicacion_id`, `fecha_creacion`) VALUES
(1, 'El muestrario de animales en la selva es colorido y surtido, cada personaje está logrado con una verosimilitud perfecta, el trabajo de arte, de ambientación se impone dando un disfrute visual tanto para chicos como para grandes', 4, 1, '2024-05-30 05:00:00'),
(2, 'Perú fue distinguido por segundo año consecutivo, y por décima vez, como Destino culinario líder en el mundo', 5, 2, '2024-05-30 05:00:00'),
(4, 'New Open World Corporation organizó un concurso, tomando en cuenta la opinión del público sobre las construcciones más sorprendentes del mundo que se encuentran en pie hasta el día de hoy.', 8, 4, '2024-05-30 05:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_publicacion`
--

CREATE TABLE `imagenes_publicacion` (
  `imagen_id` int(11) NOT NULL,
  `publicacion_id` int(11) NOT NULL,
  `imagen_publicacion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes_publicacion`
--

INSERT INTO `imagenes_publicacion` (`imagen_id`, `publicacion_id`, `imagen_publicacion`) VALUES
(1, 1, '1716882319118-Bagheera.jpg'),
(2, 1, '1716882343874-Baloo.jpg'),
(3, 1, '1716882362829-Hathi.jpg'),
(4, 1, '1716882376266-Kaa.jpg'),
(5, 1, '1716882391338-Louie.jpg'),
(6, 1, '1716882402861-Shere_Khan.jpg'),
(7, 2, '1716882851866-Arroz-con-pollo.jpg'),
(8, 2, '1716882936712-causa-rellena.jpg'),
(9, 2, '1716882950698-ceviche.jpg'),
(10, 2, '1716882963376-frejolada-pato.jpg'),
(11, 2, '1716882986483-lomo-saltado.jpg'),
(19, 4, '1716942278368-chichen-itza.jpg'),
(20, 4, '1716942309312-Coliseo-Roma.jpg'),
(21, 4, '1716942415999-Cristo_Redentor.jpg'),
(22, 4, '1716942429520-Machu-Picchu.jpg'),
(23, 4, '1716942445009-Muralla-China.jpg'),
(24, 4, '1716942463426-Petra.jpg'),
(25, 4, '1716942477029-Taj-Mahal.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `persona_id` int(11) NOT NULL,
  `persona_nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `foto_perfil` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`persona_id`, `persona_nombre`, `email`, `contrasena`, `rol_id`, `foto_perfil`) VALUES
(4, 'Esteban', 'eseban@gmail.com', '12345', 1, '1716783491587-perrito.jpg'),
(5, 'Julian', 'jul@gmail.com', 'meteoro', 2, '1716783859294-gatito3.png'),
(8, 'Jose', 'jose@hotmail.com', 'jose345', 2, '1716793207181-perrito2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `publicacion_id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` text NOT NULL,
  `persona_id` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`publicacion_id`, `titulo`, `contenido`, `persona_id`, `fecha_creacion`) VALUES
(1, 'El Libro de la Selva', 'El oso Baloo, la pantera Bagheera, el tigre Shere Khan, el orangután Louie, el elefante Hathi y la serpiente Kaa recuerdan las aventuras que vivieron durante su infancia en la selva antes de la llegada de Mowgli', 4, '2024-05-27 05:00:00'),
(2, 'Gastronomía del Perú', 'La gastronomía peruana es el conjunto de platillos y técnicas culinarias del Perú que forman parte de las tradiciones y vida común de sus habitantes, resultado de la fusión de la tradición culinaria del antiguo Perú con la gastronomía europea, asiática entre otras.', 5, '2024-05-27 05:00:00'),
(4, 'Las 7 maravillas del mundo moderno', 'En el año 2007 se declararon oficialmente las 7 Maravillas del Mundo Moderno, después de que más de 90 millones de personas votaran en un concurso oficial a nivel mundial, organizado por la empresa New Open World Corporation.', 8, '2024-05-27 05:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion_categoria`
--

CREATE TABLE `publicacion_categoria` (
  `publicacion_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicacion_categoria`
--

INSERT INTO `publicacion_categoria` (`publicacion_id`, `categoria_id`) VALUES
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `persona_id` (`persona_id`),
  ADD KEY `publicacion_id` (`publicacion_id`);

--
-- Indices de la tabla `imagenes_publicacion`
--
ALTER TABLE `imagenes_publicacion`
  ADD PRIMARY KEY (`imagen_id`),
  ADD KEY `publicacion_id` (`publicacion_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`persona_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`publicacion_id`),
  ADD KEY `persona_id` (`persona_id`);

--
-- Indices de la tabla `publicacion_categoria`
--
ALTER TABLE `publicacion_categoria`
  ADD PRIMARY KEY (`publicacion_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `comentario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes_publicacion`
--
ALTER TABLE `imagenes_publicacion`
  MODIFY `imagen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `persona_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `publicacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`persona_id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`publicacion_id`);

--
-- Filtros para la tabla `imagenes_publicacion`
--
ALTER TABLE `imagenes_publicacion`
  ADD CONSTRAINT `imagenes_publicacion_ibfk_1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`publicacion_id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`persona_id`);

--
-- Filtros para la tabla `publicacion_categoria`
--
ALTER TABLE `publicacion_categoria`
  ADD CONSTRAINT `publicacion_categoria_ibfk_1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`publicacion_id`),
  ADD CONSTRAINT `publicacion_categoria_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
