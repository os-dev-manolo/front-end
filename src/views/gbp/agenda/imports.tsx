import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RRule, RRuleSet } from "rrule";
import { AgendaApiService } from "../../../shared/services/api/agenda-api-service";
import { AgendaEvent, AgendaEventEdit } from "./events";
import "../../../components/page-releated/agenda/events/calendar-overrides.css";
import { EventDetailModal } from "./modals-menus";
import {
    useFilters,
    iconMap,
    colorMap,
    iconDescriptions,
} from "./colors-icons-desc";
import { LoadingContext } from "../../../components/global/loading";
import { handleNavigate } from "./handleNavigate";

export {
    RRuleSet,
    RRule,
    React,
    useEffect,
    useMemo,
    useRef,
    useState,
    useContext,
    moment,
    Calendar,
    momentLocalizer,
    Modal,
    Button,
    Dropdown,
    toast,
    AgendaApiService,
    AgendaEvent,
    AgendaEventEdit,
    EventDetailModal,
    useFilters,
    iconMap,
    colorMap,
    iconDescriptions,
    LoadingContext,
    handleNavigate,
};
