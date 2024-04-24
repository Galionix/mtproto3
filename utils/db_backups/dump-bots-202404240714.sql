--
-- PostgreSQL database cluster dump
--

-- Started on 2024-04-24 07:14:10

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE "user";
ALTER ROLE "user" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.3

-- Started on 2024-04-24 07:14:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-04-24 07:14:10

--
-- PostgreSQL database dump complete
--

--
-- Database "bots" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.3

-- Started on 2024-04-24 07:14:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3438 (class 1262 OID 16384)
-- Name: bots; Type: DATABASE; Schema: -; Owner: user
--

CREATE DATABASE bots WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE bots OWNER TO "user";

\connect bots

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16444)
-- Name: answer_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.answer_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    request text[] DEFAULT '{}'::text[] NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isDmAnswer" boolean DEFAULT false NOT NULL,
    "isGroupAnswer" boolean DEFAULT false NOT NULL,
    "isChannelAnswer" boolean DEFAULT false NOT NULL,
    base_probability character varying DEFAULT '1'::character varying NOT NULL,
    db_name character varying DEFAULT 'base'::character varying NOT NULL,
    "nextBranchId" character varying,
    index integer DEFAULT 0 NOT NULL,
    "branchId" character varying
);


ALTER TABLE public.answer_entity OWNER TO "user";

--
-- TOC entry 219 (class 1259 OID 16462)
-- Name: bot_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.bot_entity (
    api_id integer NOT NULL,
    api_hash character varying NOT NULL,
    "sessionString" character varying NOT NULL,
    "clientState" character varying NOT NULL,
    "clientStateUpdateTime" timestamp without time zone NOT NULL,
    "behaviorModel" character varying NOT NULL,
    "answersDb" character varying NOT NULL,
    "readDelay" integer NOT NULL,
    "typeDelayMultiplier" integer NOT NULL,
    "taskOrder" character varying NOT NULL,
    "afterTaskDelay" integer NOT NULL,
    "afterTaskIdleTime" integer NOT NULL,
    "dmScenarioNames" text,
    voice character varying NOT NULL,
    replacements character varying NOT NULL,
    "copyFrom" integer NOT NULL,
    "spamDBname" character varying NOT NULL,
    "botName" character varying NOT NULL
);


ALTER TABLE public.bot_entity OWNER TO "user";

--
-- TOC entry 221 (class 1259 OID 24684)
-- Name: group_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.group_entity (
    name character varying NOT NULL,
    status character varying NOT NULL,
    total_members integer NOT NULL,
    total_messages_sent integer NOT NULL,
    total_messages_received integer NOT NULL,
    joined_at timestamp without time zone NOT NULL,
    left_at timestamp without time zone NOT NULL,
    last_message_sent_at timestamp without time zone NOT NULL,
    error character varying NOT NULL,
    behavior_model character varying NOT NULL,
    processing_enabled boolean NOT NULL,
    spam_frequency integer NOT NULL,
    chat_id character varying NOT NULL,
    username character varying NOT NULL,
    id character varying NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    info text NOT NULL
);


ALTER TABLE public.group_entity OWNER TO "user";

--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: message_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.message_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    type character varying NOT NULL,
    text character varying DEFAULT ''::character varying NOT NULL,
    reaction character varying DEFAULT ''::character varying NOT NULL,
    photo character varying DEFAULT ''::character varying NOT NULL,
    video character varying DEFAULT ''::character varying NOT NULL,
    audio character varying DEFAULT ''::character varying NOT NULL,
    caption character varying DEFAULT ''::character varying NOT NULL,
    sticker character varying DEFAULT ''::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    coefficient character varying DEFAULT '1'::character varying NOT NULL,
    db_name character varying DEFAULT 'base'::character varying NOT NULL,
    index integer DEFAULT 0 NOT NULL,
    "answerId" uuid,
    "isSpam" boolean DEFAULT false NOT NULL,
    "scenarioIdForSpam" character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.message_entity OWNER TO "user";

--
-- TOC entry 217 (class 1259 OID 16434)
-- Name: scenario_branch_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.scenario_branch_entity (
    id character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    index integer DEFAULT 0 NOT NULL,
    "scenarioId" uuid
);


ALTER TABLE public.scenario_branch_entity OWNER TO "user";

--
-- TOC entry 216 (class 1259 OID 16421)
-- Name: scenario_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.scenario_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    db_name character varying DEFAULT 'base'::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "maxConversationLength" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.scenario_entity OWNER TO "user";

--
-- TOC entry 220 (class 1259 OID 16469)
-- Name: statistic_entity; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.statistic_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    api_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    type character varying NOT NULL,
    dialogs integer NOT NULL,
    links_sent integer NOT NULL
);


ALTER TABLE public.statistic_entity OWNER TO "user";

--
-- TOC entry 3429 (class 0 OID 16444)
-- Dependencies: 218
-- Data for Name: answer_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.answer_entity (id, description, request, "createdAt", "updatedAt", "isDmAnswer", "isGroupAnswer", "isChannelAnswer", base_probability, db_name, "nextBranchId", index, "branchId") FROM stdin;
254168f1-6996-4906-be66-460095c27393		{}	2024-04-21 07:52:30.764264	2024-04-21 07:52:30.77756	f	f	f	1	base	e020b7e7-e89a-3018-bf7e-08e71a77652e	0	eb69deac-1bad-3ed9-b6b5-e2988cc6327e
46491db7-55aa-4027-819e-a637fd9ed010		{}	2024-04-21 07:52:30.770865	2024-04-21 07:52:30.787405	f	f	f	1	base	7a190e3b-e1ef-3a55-9d27-1236ec01bfb6	0	3dc83b06-3882-3f83-8ed8-99bac56c87e9
caabe91d-6781-4f52-a1d4-fc760c5a2631		{}	2023-11-18 01:48:40.007428	2023-11-18 01:48:40.017061	f	f	f	1	base	конец	0	конец
a2c35599-3222-431d-b8a5-66800b00c352		{}	2024-04-21 07:52:30.771439	2024-04-21 07:52:30.787851	f	f	f	1	base	3dc83b06-3882-3f83-8ed8-99bac56c87e9	0	e020b7e7-e89a-3018-bf7e-08e71a77652e
29f29be3-8185-4246-ad3f-b1dd40bac6f9		{}	2023-11-18 01:48:40.001548	2023-11-18 01:48:40.019578	f	f	f	1	base	начало	0	начало
dea757cf-3d9e-4219-9f54-5373748471e2		{прив,хай,здар,здор,здра,куку,ку-ку,ало}	2023-11-18 01:48:40.003564	2023-11-18 01:48:40.019578	f	f	f	1	base	привет	1	начало
d4098c40-27a6-4ee9-aefc-a6e0ddc02a02		{дела,занимаешься,заня}	2023-11-18 01:48:40.007312	2023-11-18 01:48:40.019923	f	f	f	1	base	конец	1	привет
aaa4c257-a059-423b-8242-9c3bc40453aa		{}	2023-11-18 01:48:40.006601	2023-11-18 01:48:40.019923	f	f	f	1	base	привет	0	привет
fc53ee1c-730b-4cf2-83fa-f5eae02452c6		{}	2024-04-22 06:07:20.541964	2024-04-22 06:07:20.572829	f	f	f	1	base	acknowledge_branch	0	greeting_branch
2295e0ec-17e0-4630-a3c9-38b56de36938		{}	2024-02-07 06:53:47.095791	2024-02-07 06:53:47.128414	f	f	f	1	base	step2	0	step1
ef8ff95d-22c2-4cd1-9a16-955c0406b942		{}	2024-02-07 06:53:47.117687	2024-02-07 06:53:47.14765	f	f	f	1	base	step3	0	step2
fe1dacc5-a43b-41f4-8ba8-2d5ff0fbd0f5		{}	2024-02-07 06:53:47.123847	2024-02-07 06:53:47.148216	f	f	f	1	base	end	0	link
ea331fd9-aa7e-468e-b74c-ea93ef4b8b26		{}	2024-02-07 06:53:47.118415	2024-02-07 06:53:47.148372	f	f	f	1	base	step4	0	step3
4b3637ec-985f-411b-b067-590b2fa502de		{}	2024-02-07 06:53:47.12365	2024-02-07 06:53:47.148572	f	f	f	1	base	link	0	step4
f4302626-a4d7-4987-ae9f-79b82a744f7f		{"не надо","не интерес",нет,"не хочу",обойдусь}	2024-02-07 06:53:47.147972	2024-02-07 06:53:47.167219	f	f	f	1	base	end	1	step4
8276278d-898e-4b22-a5db-dc48cb1ff4ee		{}	2024-04-22 06:16:45.776402	2024-04-22 06:16:45.788285	f	f	f	1	base	end_branch	0	confirm_branch
313f41e0-a6f3-43c6-b932-334fbceacadc		{}	2024-04-22 06:18:33.078944	2024-04-22 06:18:33.093281	f	f	f	1	base	acknowledge_branch	0	greet_branch
c9564346-0dc1-4817-916f-f2427a84577a		{}	2024-04-22 06:18:33.085242	2024-04-22 06:18:33.100037	f	f	f	1	base	confirm_branch	0	acknowledge_branch
a14ef75c-f3cb-473b-84d7-c2ba82a1c1f6		{}	2024-04-22 06:18:33.093563	2024-04-22 06:18:33.226858	f	f	f	1	base	confirm_branch	1	acknowledge_branch
11fbb67c-2589-4133-8878-67ddf4cc6e20		{}	2024-04-22 06:18:33.10045	2024-04-22 06:18:33.226858	f	f	f	1	base	end_branch	2	acknowledge_branch
\.


--
-- TOC entry 3430 (class 0 OID 16462)
-- Dependencies: 219
-- Data for Name: bot_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.bot_entity (api_id, api_hash, "sessionString", "clientState", "clientStateUpdateTime", "behaviorModel", "answersDb", "readDelay", "typeDelayMultiplier", "taskOrder", "afterTaskDelay", "afterTaskIdleTime", "dmScenarioNames", voice, replacements, "copyFrom", "spamDBname", "botName") FROM stdin;
21502850	4e234e4dc6bd589d20dabd4e0ab4ce87	1BQANOTEuMTA4LjU2LjE3NAG7law4OXa/pIRVIGx/oeDLkwwQEYDBFPeuybN9JOoz8XEgBwCj6BI4pV93wcAnx1iyc873+RAq76l0klI2KxPNd/gEY33346WazpaH3jcTHKeyuN3cPd+lJgj5gYr00I0qMhq11HoAUi/nNV/wRyYI/DrrlnFRnKtZJJGqcdLJ76xjrjMqkMHvVeug31Lb8xsz2vlQgJHRadR7elUbVIAYSuv08uJvD8Y13IU+mXjjiyN+wspjrexs/TbZxdyxzIxW80td4VWAzcmABMiw2styY0Ewdhrq7LFMBjktQBMbcnmCPOhsdjaXYLYt599ZvtRXIxUP3LLzzcuTvvlRgRGW0g==	{"tasks":[{"id":"2bc2ee10-83c5-493a-82e7-7b2ed43bddf3","type":"SPAM_TO_GROUP","date":1713692822402,"payload":{"spamGroupId":"1815728840","spamGroupIdString":"1815728840"}}],"bio":{"firstName":"Машуля","lastName":"😘","about":"скучаю ♥"},"groupCounters":{"1815728840":{"messagesSinceLastSpam":0,"id":"1815728840","membersCount":3,"spamInterval":3}}}	2024-04-21 12:47:02.411	base	base	1000	1	RESPOND_TO_DM_MESSAGE,SPAM_TO_GROUP,GROUP_JOIN,GROUP_LEAVE,RESPOND_TO_GROUP_MESSAGE	1000	1000	audio_scenario_link	ksenia	{\n"link": "1650"\n}	-1	test	andromeda
23331061	ea63ef37b59ee0dd36acfcf571630c59	1BQANOTEuMTA4LjU2LjE4MQG7P3JfvGdQ+SINVbE5XDm4NpKgmv7RSVwh45T1GfNod8EaDlqWj4iPGcAWbYJ2oY2svoD4IYy/iFylQeW1sj91C7CCBsOVJnl7WdcVUbAdWW9+uwAXhLtkEzqsEohK1wv+Hl//PdCqRH0usoKNaRSGPTgs/+e5FdQYDMc8N5W6A/ewnyUCbimOmuxWsvpuhKBYa6YnHuhsWZp60sLSipHk0kaHshrbCGvMB2ElH94iMyrc9tGVLQpCI9NDhYbNfDOvdtQO0QR2jNSIVosGw0UGYpcQXMe8RFAz44h9OUiHjVHaagVT/K0mrCOA34Dg1riDy0aBj90F7YFrwjR/hgHvVA==	{"tasks":[{"id":"f298a03e-6641-4ee8-97f1-a473f1afef8e","type":"RESPOND_TO_UNREAD_DM_MESSAGE","date":1713594192640},{"id":"8d4e6109-1f70-4c95-93e3-1ae063352473","type":"LIST_GROUPS","date":1713594192640,"payload":null}],"bio":{"firstName":"Amelie","lastName":"Nice","about":"very nice girl"},"groupCounters":{}}	2024-04-20 09:23:13.813	base	base	1000	1	RESPOND_TO_DM_MESSAGE,SPAM_TO_GROUP,GROUP_JOIN,GROUP_LEAVE,RESPOND_TO_GROUP_MESSAGE,RESPOND_TO_UNREAD_DM_MESSAGE	1000	1000	audio_scenario_link	ksenia	{\n"link": "1644"\n}	-1	base	amelie
\.


--
-- TOC entry 3432 (class 0 OID 24684)
-- Dependencies: 221
-- Data for Name: group_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.group_entity (name, status, total_members, total_messages_sent, total_messages_received, joined_at, left_at, last_message_sent_at, error, behavior_model, processing_enabled, spam_frequency, chat_id, username, id, updated_at, info) FROM stdin;
test123	active	2	0	0	2024-04-20 05:52:56.842	1899-12-31 00:00:00	1899-12-31 00:00:00			t	0	-1002061411688	Shsakq	-1002061411688_21502850	2024-04-21 11:24:50.743	{}
test	active	2	0	0	2024-04-20 05:52:56.853	1899-12-31 00:00:00	1899-12-31 00:00:00			t	0	-842577481		-842577481_21502850	2024-04-21 11:24:50.748	{}
my dev group	active	3	0	0	2024-04-20 05:52:56.831	1899-12-31 00:00:00	2024-04-21 12:47:05.581			t	0	-1001815728840	thunderstrucks97	-1001815728840_21502850	2024-04-21 12:47:05.586	{}
my dev group	active	4	0	0	2024-04-20 05:52:56.078	1899-12-31 00:00:00	1899-12-31 00:00:00			t	0	-1001815728840	thunderstrucks97	-1001815728840_23331061	2024-04-20 06:11:19.051	{}
\.


--
-- TOC entry 3426 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: message_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.message_entity (id, description, type, text, reaction, photo, video, audio, caption, sticker, "createdAt", "updatedAt", coefficient, db_name, index, "answerId", "isSpam", "scenarioIdForSpam") FROM stdin;
ed3a7adb-6ce9-4664-bff7-9ff42e9c8086		TEXT	346437сообщение для спама со сценарием 2							2024-04-20 20:04:04.556711	2024-04-21 05:09:25.734027	1	base	0	\N	t	a6e26e51-994d-47d9-91db-970c05f64318
d0bc575e-2677-4fd5-8ec9-3cce031cb2bd		TEXT	тут всегда так скучно?(							2024-02-10 22:54:07.797953	2024-02-10 22:54:07.797953	1	group_spam_db	0	\N	t	
edb00887-9bfa-49ea-b8c6-3d946a332ff1		TEXT	Кто-нибудь здесь хочет стать моим героем дня и развеселить? 🌟							2024-02-20 21:19:02.285705	2024-02-20 21:19:02.285705	1	group_spam_db	0	\N	t	
794cd52a-8c3c-44fc-8e1a-32713fd86a7d		TEXT	Кто последний видел мою мотивацию? Пропала где-то между утром и сейчас. 🙈							2024-02-20 21:19:26.119061	2024-02-20 21:19:26.119061	1	group_spam_db	0	\N	t	
072211b7-63a5-443f-a15b-92b68bdabbe3		TEXT	Я только что придумала супергеройское имя для себя. Хотите узнать, какое? 🔮							2024-02-20 21:19:36.957162	2024-02-20 21:19:36.957162	1	group_spam_db	0	\N	t	
416324f9-59d8-490e-ae6c-2a8dfd6c5f32		TEXT	Если бы я была эмодзи, я была бы... Как думаете, какой? 🤔							2024-02-20 21:19:48.249075	2024-02-20 21:19:48.249075	1	group_spam_db	0	\N	t	
b49a0b1a-1563-49b9-a1d5-46c2e44d3aae		TEXT	Срочно нужен совет! Какой фильм посмотреть вечером?							2024-02-20 21:19:56.911855	2024-02-20 21:19:56.911855	1	group_spam_db	0	\N	t	
3bb19fdf-0ba5-4cea-9bee-0548b0d88bfe		TEXT	Я здесь новенькая... Кто расскажет мне все тайны нашей группы? 🕵️‍♀️							2024-02-20 21:20:31.313691	2024-02-20 21:20:31.313691	1	group_spam_db	0	\N	t	
a1ea7574-3234-459b-9dbd-bcbf9e7ea97a		TEXT	не могу уснуть после увиденного..							2024-02-20 22:51:23.144809	2024-02-20 22:51:23.144809	1	base	0	\N	t	
637f82d2-358a-4079-b252-69140517d041		TEXT	Я здесь новенькая... Кто расскажет мне все тайны нашей группы? 🕵️‍♀️							2024-02-20 22:51:30.451818	2024-02-20 22:51:30.451818	1	base	0	\N	t	
98228a81-329e-4cc9-9a33-5d6ef7fb3f4d		TEXT	не могу уснуть после увиденного..							2024-02-10 22:49:57.442779	2024-02-10 22:49:57.442779	1	group_spam_db	0	\N	t	
a66b9c09-68ba-46bc-a079-3e64dbf41d4f		TEXT	?							2023-11-18 01:48:39.97155	2023-11-18 01:48:40.001548	1	base	0	29f29be3-8185-4246-ad3f-b1dd40bac6f9	f	
5577f854-12b7-49ac-b2c0-108063942704		TEXT								2023-11-18 01:48:39.987243	2023-11-18 01:48:40.003564	1	base	4	dea757cf-3d9e-4219-9f54-5373748471e2	f	
a6c5c199-2d33-4952-8343-4b5187b1b9a5		TEXT	сообщение спама со сценарием							2024-04-20 07:49:34.122274	2024-04-20 07:49:34.122274	1	base	0	\N	t	
fa7660e0-e761-4555-949f-bb9c0d8d5fe4		TEXT	test							2024-04-21 06:15:43.852845	2024-04-21 07:53:28.293493	1	test	0	\N	t	f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc
67713363-c942-4c7b-b28f-97fa8ecc7e35		TEXT	и тебе приветик							2024-04-21 07:52:30.758382	2024-04-21 07:52:30.764264	1	base	0	254168f1-6996-4906-be66-460095c27393	f	
127123dc-4178-4660-bc5b-1b1e4d912fe5		AUDIO					step1.ogg			2024-04-21 07:52:30.763977	2024-04-21 07:52:30.770865	1	base	0	46491db7-55aa-4027-819e-a637fd9ed010	f	
17255d86-5595-4100-bb0d-f772421d74bd		TEXT	а?							2023-11-18 01:48:39.992285	2023-11-18 01:48:40.001548	1	base	2	29f29be3-8185-4246-ad3f-b1dd40bac6f9	f	
a6156197-5678-4c53-914a-4ebbaa7ec29b		TEXT	что							2023-11-18 01:48:39.991537	2023-11-18 01:48:40.001548	1	base	1	29f29be3-8185-4246-ad3f-b1dd40bac6f9	f	
39b6d9fa-732c-4c62-9eec-205a9bb371d9		TEXT	привет котик							2023-11-18 01:48:39.993257	2023-11-18 01:48:40.003564	1	base	1	dea757cf-3d9e-4219-9f54-5373748471e2	f	
82f9bede-775b-4f19-9068-3d19337b3e5d		TEXT	ам?							2023-11-18 01:48:39.989088	2023-11-18 01:48:40.006601	1	base	1	aaa4c257-a059-423b-8242-9c3bc40453aa	f	
05b6fbe3-7824-421c-a984-2d1a77e5c597		TEXT	ам?							2023-11-18 01:48:39.992469	2023-11-18 01:48:40.001548	1	base	3	29f29be3-8185-4246-ad3f-b1dd40bac6f9	f	
1ec57669-7f6e-4ed7-8012-f3bce4a3cfc7		TEXT								2023-11-18 01:48:40.000739	2023-11-18 01:48:40.007428	1	base	0	caabe91d-6781-4f52-a1d4-fc760c5a2631	f	
7e9e8e52-e618-46d4-b5e6-de88fa38f3fc		TEXT	да сладкий							2023-11-18 01:48:39.992607	2023-11-18 01:48:40.003564	1	base	0	dea757cf-3d9e-4219-9f54-5373748471e2	f	
05038f47-5cc3-40c4-9af7-fd3c969e442e		TEXT	сидим с подругой)							2023-11-18 01:48:40.000584	2023-11-18 01:48:40.007312	1	base	0	d4098c40-27a6-4ee9-aefc-a6e0ddc02a02	f	
966a6aae-8e86-495e-a8f5-e8261039d11b		TEXT	?							2023-11-18 01:48:39.988979	2023-11-18 01:48:40.006601	1	base	0	aaa4c257-a059-423b-8242-9c3bc40453aa	f	
d8a0d8cd-4db3-4cc0-b7a5-95199247d33a		TEXT	мур)							2023-11-18 01:48:39.993847	2023-11-18 01:48:40.003564	1	base	2	dea757cf-3d9e-4219-9f54-5373748471e2	f	
71c5f0aa-c40a-49d3-a71a-2d2fd1e9d674		TEXT	что-что?							2023-11-18 01:48:39.999376	2023-11-18 01:48:40.006601	1	base	2	aaa4c257-a059-423b-8242-9c3bc40453aa	f	
e4bdd312-3cdb-420f-92a4-2b3ecf5a9407		TEXT	милаш я ждала что ты напишешь							2023-11-18 01:48:39.995971	2023-11-18 01:48:40.003564	1	base	3	dea757cf-3d9e-4219-9f54-5373748471e2	f	
bf85eb51-da32-4fe0-b5d1-4b59eaeafef8		TEXT	сорри сейчас немного занята не могу ответить							2023-11-18 01:48:39.999651	2023-11-18 01:48:40.006601	1	base	3	aaa4c257-a059-423b-8242-9c3bc40453aa	f	
424fad7a-4e3f-4d61-b74d-3fc2f64df64d		TEXT								2023-11-18 01:48:40.000209	2023-11-18 01:48:40.006601	1	base	4	aaa4c257-a059-423b-8242-9c3bc40453aa	f	
12d921ba-5175-4745-bf66-d6bae9fd26d9		TEXT	ну ладно как скажешь							2024-04-21 07:52:30.765906	2024-04-21 07:52:30.771439	1	base	0	a2c35599-3222-431d-b8a5-66800b00c352	f	
4680c903-1f27-4cc4-a6cb-7a16c8d3d8c5		TEXT	а ты что думал, в сказку попал?							2024-04-22 06:07:20.536676	2024-04-22 06:07:20.541964	1	base	0	fc53ee1c-730b-4cf2-83fa-f5eae02452c6	f	
56249a3b-d973-40c8-b0cc-01f09db979db		TEXT	ага, хорошо.							2024-04-22 06:16:45.766182	2024-04-22 06:16:45.776402	1	base	0	8276278d-898e-4b22-a5db-dc48cb1ff4ee	f	
67d3b440-0547-4d84-8f29-e89f0cd054a2		TEXT	а ты что думал, в сказку попал?							2024-04-22 06:18:33.067454	2024-04-22 06:18:33.078944	1	base	0	313f41e0-a6f3-43c6-b932-334fbceacadc	f	
4628b4b9-e7c3-4236-a86b-6295d7bebeb8		TEXT	ого а ты у нас самый умный?							2024-04-22 06:18:33.078755	2024-04-22 06:18:33.085242	1	base	0	c9564346-0dc1-4817-916f-f2427a84577a	f	
045b259a-9ea4-4490-92ff-ab2a0e5b33aa		TEXT	что правда?							2024-04-22 06:18:33.085387	2024-04-22 06:18:33.093563	1	base	0	a14ef75c-f3cb-473b-84d7-c2ba82a1c1f6	f	
915eb22a-ea8f-4abb-a624-3422d50b5b4a		TEXT	ого ладно							2024-04-22 06:18:33.091787	2024-04-22 06:18:33.10045	1	base	0	11fbb67c-2589-4133-8878-67ddf4cc6e20	f	
8cdc4b9e-1566-409b-953c-23ca4928f115		TEXT	пример спама							2024-04-22 20:06:13.027642	2024-04-22 20:06:13.027642	1	test	0	\N	t	88cd075b-3f64-4c53-adcc-3f21bb3d269f
9001ef91-5dce-4735-89ad-cd148b5396b2		AUDIO					step1.ogg			2024-02-07 06:53:47.089657	2024-02-07 06:53:47.095791	1	base	0	2295e0ec-17e0-4630-a3c9-38b56de36938	f	
9a316407-4659-4bb0-b0b1-aa0aa63a826b		AUDIO					step2.ogg			2024-02-07 06:53:47.098634	2024-02-07 06:53:47.117687	1	base	0	ef8ff95d-22c2-4cd1-9a16-955c0406b942	f	
e1ddcafe-f776-490c-b3f4-083d5cc006a7		AUDIO					step3.ogg			2024-02-07 06:53:47.100999	2024-02-07 06:53:47.118415	1	base	0	ea331fd9-aa7e-468e-b74c-ea93ef4b8b26	f	
9d3924be-0ff9-47ec-8ca4-4c5a4617b5c0		AUDIO					step4.ogg			2024-02-07 06:53:47.107613	2024-02-07 06:53:47.12365	1	base	0	4b3637ec-985f-411b-b067-590b2fa502de	f	
f82d41f2-8ebf-453d-bba2-ce99b7b081da		TEXT	вот тут http://love4datingme.xyz/?r=##link## я провожу стрим							2024-02-07 06:53:47.109738	2024-02-07 06:53:47.123847	1	base	0	fe1dacc5-a43b-41f4-8ba8-2d5ff0fbd0f5	f	
c88b41a6-e7a4-4487-a3bb-a9754a47c450		TEXT	ладно, как хочешь. Если будет скучно - заходи) вот тут http://love4datingme.xyz/?r=##link## я провожу стрим							2024-02-07 06:53:47.107633	2024-02-07 06:53:47.147972	1	base	0	f4302626-a4d7-4987-ae9f-79b82a744f7f	f	
bd46cf95-980f-4fe8-8518-91b3ec59210c		TEXT	с тобой будет веселее) http://love4datingme.xyz/?r=##link##							2024-02-07 06:53:47.127619	2024-02-07 06:53:47.147972	1	base	2	f4302626-a4d7-4987-ae9f-79b82a744f7f	f	
21ff326b-a245-4e06-af41-cfb8e6418b43		TEXT	в любом случае я тут http://love4datingme.xyz/?r=##link##							2024-02-07 06:53:47.1285	2024-02-07 06:53:47.147972	1	base	1	f4302626-a4d7-4987-ae9f-79b82a744f7f	f	
\.


--
-- TOC entry 3428 (class 0 OID 16434)
-- Dependencies: 217
-- Data for Name: scenario_branch_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.scenario_branch_entity (id, description, index, "scenarioId") FROM stdin;
начало	начало	0	2423a325-d807-4842-b56d-61fb1e4ead8f
привет	привет	1	2423a325-d807-4842-b56d-61fb1e4ead8f
конец	конец	2	2423a325-d807-4842-b56d-61fb1e4ead8f
step1	step1	0	1c67828a-7da2-4149-9538-0ca6c060cc95
step3	step3	2	1c67828a-7da2-4149-9538-0ca6c060cc95
step2	step2	1	1c67828a-7da2-4149-9538-0ca6c060cc95
step4	step4	3	1c67828a-7da2-4149-9538-0ca6c060cc95
link	link	4	1c67828a-7da2-4149-9538-0ca6c060cc95
end	end	5	1c67828a-7da2-4149-9538-0ca6c060cc95
eb69deac-1bad-3ed9-b6b5-e2988cc6327e		0	f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc
7a190e3b-e1ef-3a55-9d27-1236ec01bfb6		3	f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc
e020b7e7-e89a-3018-bf7e-08e71a77652e		1	f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc
3dc83b06-3882-3f83-8ed8-99bac56c87e9		2	f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc
greeting_branch		0	88cd075b-3f64-4c53-adcc-3f21bb3d269f
confirm_branch		2	aabf6034-d4b2-47f2-ab18-65651a94089b
greet_branch		0	5d48fbdc-1028-41ae-a081-d40c9c535f7a
acknowledge_branch		1	5d48fbdc-1028-41ae-a081-d40c9c535f7a
end_branch		2	5d48fbdc-1028-41ae-a081-d40c9c535f7a
\.


--
-- TOC entry 3427 (class 0 OID 16421)
-- Dependencies: 216
-- Data for Name: scenario_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.scenario_entity (id, db_name, description, "createdAt", "updatedAt", "maxConversationLength") FROM stdin;
2423a325-d807-4842-b56d-61fb1e4ead8f	base	initial3	2023-11-18 01:48:39.947519	2023-11-18 01:48:39.947519	100
4685c00b-27b0-43c1-a88c-c33170984424	base	audio_scenario	2023-11-18 08:12:27.576263	2023-11-18 08:12:27.576263	100
2bbf2269-600d-4e8f-91a2-95f07b48d76b	base	audio_scenario2	2023-11-18 08:17:18.38875	2023-11-18 08:17:18.38875	100
44f71c09-bbc9-4497-8b8f-2ce1841b4a1a	base	audio_scenario_full	2024-02-04 02:53:02.3147	2024-02-04 02:53:02.3147	100
03a4dd77-4695-463b-a3e9-5fbd15ea7df1	base	audio_scenario_full	2024-02-04 07:21:43.175987	2024-02-04 07:21:43.175987	100
03dcbe87-acb3-4b2a-819b-a1ccf6b98156	base	audio_scenario_full_2	2024-02-04 07:22:17.293083	2024-02-04 07:22:17.293083	100
18073272-8c5d-4285-9f62-e6cae47fee71	base	audio_scenario_final	2024-02-05 21:54:28.509756	2024-02-05 21:54:28.509756	100
ebf210a7-0894-46ea-9745-35c3682c79ca	base	audio_scenario_final_2	2024-02-05 21:58:04.000724	2024-02-05 21:58:04.000724	100
c33673e9-3394-4e07-aee1-389b27b5c602	base	audio_scenario_final_final_2	2024-02-05 21:59:29.801693	2024-02-05 21:59:29.801693	100
1c67828a-7da2-4149-9538-0ca6c060cc95	base	audio_scenario_link	2024-02-07 06:53:47.041298	2024-02-07 06:53:47.041298	100
a6e26e51-994d-47d9-91db-970c05f64318	base	description	2024-04-20 07:40:23.288855	2024-04-20 07:40:23.288855	100
32558e41-0b08-4849-a762-ee68a4749c41	base	spam_test	2024-04-21 07:51:16.598973	2024-04-21 07:51:16.598973	100
f9b7f3c0-eeca-43f9-a9b9-51975cc55bbc	base	spam_test_2	2024-04-21 07:52:30.729225	2024-04-21 07:52:30.729225	100
88cd075b-3f64-4c53-adcc-3f21bb3d269f	base	derzky	2024-04-22 06:07:20.498158	2024-04-22 06:07:20.498158	100
aabf6034-d4b2-47f2-ab18-65651a94089b	base	A conversation with greetings and acknowledgments	2024-04-22 06:16:45.732884	2024-04-22 06:16:45.732884	100
5d48fbdc-1028-41ae-a081-d40c9c535f7a	base	new test	2024-04-22 06:18:33.040774	2024-04-22 06:18:33.040774	100
\.


--
-- TOC entry 3431 (class 0 OID 16469)
-- Dependencies: 220
-- Data for Name: statistic_entity; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.statistic_entity (id, api_id, date, type, dialogs, links_sent) FROM stdin;
\.


--
-- TOC entry 3274 (class 2606 OID 16461)
-- Name: answer_entity PK_3158283e703015676d2e7c7d862; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.answer_entity
    ADD CONSTRAINT "PK_3158283e703015676d2e7c7d862" PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 16420)
-- Name: message_entity PK_45bb3707fbb99a73e831fee41e0; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.message_entity
    ADD CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 16476)
-- Name: statistic_entity PK_783ebd1bb1e4508c0d233e755ea; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.statistic_entity
    ADD CONSTRAINT "PK_783ebd1bb1e4508c0d233e755ea" PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 16433)
-- Name: scenario_entity PK_8d14e57169a89717085a03d7bad; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.scenario_entity
    ADD CONSTRAINT "PK_8d14e57169a89717085a03d7bad" PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 16468)
-- Name: bot_entity PK_be25a1ad6947992c9c807885dcf; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.bot_entity
    ADD CONSTRAINT "PK_be25a1ad6947992c9c807885dcf" PRIMARY KEY (api_id);


--
-- TOC entry 3280 (class 2606 OID 24696)
-- Name: group_entity PK_d074114199e1996b57b04ac77ba; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.group_entity
    ADD CONSTRAINT "PK_d074114199e1996b57b04ac77ba" PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 16443)
-- Name: scenario_branch_entity PK_f993721704c9c819cc3d863e379; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.scenario_branch_entity
    ADD CONSTRAINT "PK_f993721704c9c819cc3d863e379" PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 16477)
-- Name: message_entity FK_a65cd0df7ef9739f9765573a7ab; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.message_entity
    ADD CONSTRAINT "FK_a65cd0df7ef9739f9765573a7ab" FOREIGN KEY ("answerId") REFERENCES public.answer_entity(id) ON DELETE CASCADE;


--
-- TOC entry 3282 (class 2606 OID 16482)
-- Name: scenario_branch_entity FK_c0920f255eaf5db481b883ed400; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.scenario_branch_entity
    ADD CONSTRAINT "FK_c0920f255eaf5db481b883ed400" FOREIGN KEY ("scenarioId") REFERENCES public.scenario_entity(id) ON DELETE CASCADE;


--
-- TOC entry 3283 (class 2606 OID 16487)
-- Name: answer_entity FK_de9de534f3a01b04060e27b58cc; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.answer_entity
    ADD CONSTRAINT "FK_de9de534f3a01b04060e27b58cc" FOREIGN KEY ("branchId") REFERENCES public.scenario_branch_entity(id) ON DELETE CASCADE;


-- Completed on 2024-04-24 07:14:11

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.3

-- Started on 2024-04-24 07:14:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2024-04-24 07:14:11

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-04-24 07:14:11

--
-- PostgreSQL database cluster dump complete
--

