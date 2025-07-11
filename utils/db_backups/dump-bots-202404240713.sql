PGDMP                          |           bots    15.1    15.3     k           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            l           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            m           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            n           1262    16384    bots    DATABASE     o   CREATE DATABASE bots WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE bots;
                user    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            o           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    16444    answer_entity    TABLE       CREATE TABLE public.answer_entity (
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
 !   DROP TABLE public.answer_entity;
       public         heap    user    false    5    5    5            �            1259    16462 
   bot_entity    TABLE       CREATE TABLE public.bot_entity (
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
    DROP TABLE public.bot_entity;
       public         heap    user    false    5            �            1259    24684    group_entity    TABLE     �  CREATE TABLE public.group_entity (
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
     DROP TABLE public.group_entity;
       public         heap    user    false    5            �            1259    16400    message_entity    TABLE     �  CREATE TABLE public.message_entity (
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
 "   DROP TABLE public.message_entity;
       public         heap    user    false    5    5    5            �            1259    16434    scenario_branch_entity    TABLE     �   CREATE TABLE public.scenario_branch_entity (
    id character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    index integer DEFAULT 0 NOT NULL,
    "scenarioId" uuid
);
 *   DROP TABLE public.scenario_branch_entity;
       public         heap    user    false    5            �            1259    16421    scenario_entity    TABLE     �  CREATE TABLE public.scenario_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    db_name character varying DEFAULT 'base'::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "maxConversationLength" integer DEFAULT 0 NOT NULL
);
 #   DROP TABLE public.scenario_entity;
       public         heap    user    false    5    5    5            �            1259    16469    statistic_entity    TABLE       CREATE TABLE public.statistic_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    api_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    type character varying NOT NULL,
    dialogs integer NOT NULL,
    links_sent integer NOT NULL
);
 $   DROP TABLE public.statistic_entity;
       public         heap    user    false    5    5    5            e          0    16444    answer_entity 
   TABLE DATA           �   COPY public.answer_entity (id, description, request, "createdAt", "updatedAt", "isDmAnswer", "isGroupAnswer", "isChannelAnswer", base_probability, db_name, "nextBranchId", index, "branchId") FROM stdin;
    public          user    false    218   �3       f          0    16462 
   bot_entity 
   TABLE DATA           2  COPY public.bot_entity (api_id, api_hash, "sessionString", "clientState", "clientStateUpdateTime", "behaviorModel", "answersDb", "readDelay", "typeDelayMultiplier", "taskOrder", "afterTaskDelay", "afterTaskIdleTime", "dmScenarioNames", voice, replacements, "copyFrom", "spamDBname", "botName") FROM stdin;
    public          user    false    219   $8       h          0    24684    group_entity 
   TABLE DATA           �   COPY public.group_entity (name, status, total_members, total_messages_sent, total_messages_received, joined_at, left_at, last_message_sent_at, error, behavior_model, processing_enabled, spam_frequency, chat_id, username, id, updated_at, info) FROM stdin;
    public          user    false    221   =       b          0    16400    message_entity 
   TABLE DATA           �   COPY public.message_entity (id, description, type, text, reaction, photo, video, audio, caption, sticker, "createdAt", "updatedAt", coefficient, db_name, index, "answerId", "isSpam", "scenarioIdForSpam") FROM stdin;
    public          user    false    215    >       d          0    16434    scenario_branch_entity 
   TABLE DATA           V   COPY public.scenario_branch_entity (id, description, index, "scenarioId") FROM stdin;
    public          user    false    217   cK       c          0    16421    scenario_entity 
   TABLE DATA           v   COPY public.scenario_entity (id, db_name, description, "createdAt", "updatedAt", "maxConversationLength") FROM stdin;
    public          user    false    216   M       g          0    16469    statistic_entity 
   TABLE DATA           W   COPY public.statistic_entity (id, api_id, date, type, dialogs, links_sent) FROM stdin;
    public          user    false    220   !P       �           2606    16461 ,   answer_entity PK_3158283e703015676d2e7c7d862 
   CONSTRAINT     l   ALTER TABLE ONLY public.answer_entity
    ADD CONSTRAINT "PK_3158283e703015676d2e7c7d862" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.answer_entity DROP CONSTRAINT "PK_3158283e703015676d2e7c7d862";
       public            user    false    218            �           2606    16420 -   message_entity PK_45bb3707fbb99a73e831fee41e0 
   CONSTRAINT     m   ALTER TABLE ONLY public.message_entity
    ADD CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public.message_entity DROP CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0";
       public            user    false    215            �           2606    16476 /   statistic_entity PK_783ebd1bb1e4508c0d233e755ea 
   CONSTRAINT     o   ALTER TABLE ONLY public.statistic_entity
    ADD CONSTRAINT "PK_783ebd1bb1e4508c0d233e755ea" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public.statistic_entity DROP CONSTRAINT "PK_783ebd1bb1e4508c0d233e755ea";
       public            user    false    220            �           2606    16433 .   scenario_entity PK_8d14e57169a89717085a03d7bad 
   CONSTRAINT     n   ALTER TABLE ONLY public.scenario_entity
    ADD CONSTRAINT "PK_8d14e57169a89717085a03d7bad" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.scenario_entity DROP CONSTRAINT "PK_8d14e57169a89717085a03d7bad";
       public            user    false    216            �           2606    16468 )   bot_entity PK_be25a1ad6947992c9c807885dcf 
   CONSTRAINT     m   ALTER TABLE ONLY public.bot_entity
    ADD CONSTRAINT "PK_be25a1ad6947992c9c807885dcf" PRIMARY KEY (api_id);
 U   ALTER TABLE ONLY public.bot_entity DROP CONSTRAINT "PK_be25a1ad6947992c9c807885dcf";
       public            user    false    219            �           2606    24696 +   group_entity PK_d074114199e1996b57b04ac77ba 
   CONSTRAINT     k   ALTER TABLE ONLY public.group_entity
    ADD CONSTRAINT "PK_d074114199e1996b57b04ac77ba" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.group_entity DROP CONSTRAINT "PK_d074114199e1996b57b04ac77ba";
       public            user    false    221            �           2606    16443 5   scenario_branch_entity PK_f993721704c9c819cc3d863e379 
   CONSTRAINT     u   ALTER TABLE ONLY public.scenario_branch_entity
    ADD CONSTRAINT "PK_f993721704c9c819cc3d863e379" PRIMARY KEY (id);
 a   ALTER TABLE ONLY public.scenario_branch_entity DROP CONSTRAINT "PK_f993721704c9c819cc3d863e379";
       public            user    false    217            �           2606    16477 -   message_entity FK_a65cd0df7ef9739f9765573a7ab    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_entity
    ADD CONSTRAINT "FK_a65cd0df7ef9739f9765573a7ab" FOREIGN KEY ("answerId") REFERENCES public.answer_entity(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.message_entity DROP CONSTRAINT "FK_a65cd0df7ef9739f9765573a7ab";
       public          user    false    218    215    3274            �           2606    16482 5   scenario_branch_entity FK_c0920f255eaf5db481b883ed400    FK CONSTRAINT     �   ALTER TABLE ONLY public.scenario_branch_entity
    ADD CONSTRAINT "FK_c0920f255eaf5db481b883ed400" FOREIGN KEY ("scenarioId") REFERENCES public.scenario_entity(id) ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.scenario_branch_entity DROP CONSTRAINT "FK_c0920f255eaf5db481b883ed400";
       public          user    false    217    216    3270            �           2606    16487 ,   answer_entity FK_de9de534f3a01b04060e27b58cc    FK CONSTRAINT     �   ALTER TABLE ONLY public.answer_entity
    ADD CONSTRAINT "FK_de9de534f3a01b04060e27b58cc" FOREIGN KEY ("branchId") REFERENCES public.scenario_branch_entity(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.answer_entity DROP CONSTRAINT "FK_de9de534f3a01b04060e27b58cc";
       public          user    false    3272    218    217            e   �  x��VKnG]O�B�Z�,V�5g	��1�ȁl � �?H��_E	l�vb�
=7
G�iZ��n�Y|���u Ĕ"prJ���ΥPI|��/����c <r����D"S��&�W�򇫒��Uw�t��)�w�P�tp��H�Wn�KL��
Xr�[�K�NI���I�đ�"B���S����zs�a���T؅}ܒ1��t�|R3�H>�갌�oU}��yU?ԃ���R�5Ī��Ts.ݐCE�26�Q%�2E�_q{@�#�k�5��I�P\�}����b�4���n�=L��!%�D�M� Fu�8gV�%w�>-�N�5wI����P�A�t�5 G��(�;�/�tK�0�R�R���O����|>�3_l�w�q�� �J�
�p`�4C�⅕�6��ͳ������7������������b��oΏ珛���r_V���b�������{�����d#}�	r�x�]k�Qv��������[�����_�����y�y�y�{�y�X�i	o"�X��~�9s� �]H�y������|K����(�f���5�ޱ�xW�� P?2�г�2�q�At��ژB��7]ͫ&!���#ׇ��~����}9˧�Cs����N���LD)t�M3�;�n� �j�b�>&�W 8�z~�rb:/	�����=y�"ð��ԇ��B�8��Im)c�Bu�bIL��%�6����c�sL���r�2[0-Y�ZÍ��ˎ�O+���u�������G�0���G�P�+��|\�P�%^KgXr�n̻����[s�3N��LX�&Wh��������u��Hw~y�E2��&6!�ѯ���R�!����R�h+.[u�w�{~o���H�̮���/y�bg4a�ؼڼ���v}0=|i��z!�$t��t���.%�$�@��k|9���ւc��`,�5�y�&��&kkn������t<8��+Q=��h�qx��ƭ�3z��ԓ[=�C�ޟ8��וcg�M�_��d}�[u��4�(�0&����H^F��>;hBg-J���'܄7e�>$T��e��ۢ�d̦��!]�?!��&��AoŃ�� �R�T���o���aC�o��Y��[�cI�pg8W��A��d��� ��K      f   �  x���ˎ�F���S������,c.�Փ��vcl�߸�XDg����)��N^b��y���I�H'Yd�M�����R�B�"
��S�ؼ�p���!��) ��(`m(������2����+H�U! {ܟ��V3��z�lh���٨54=Z���oN�\qk����4��Jho��zG[Pѐw�U����@w*�b"�0?#�-i!��:����8Š���kF h`�[� lm�W	�ieoM�҈� la'�k�՝�t��#��[�Zٔ�.�]K<�'6�n�e�h0���l���i;k�&Dڤ����wԋ�x�G�W����9N�a&���ә|��r����89�@�;�h't����J���e��������ͮ�p�t�%�\;L��=��t�e��������ī��~��xSeX�f)��,"�+c	���R�,X,u0�g����4�������� w;$��P���X�e1`K̖����xK�j�I�ڥ!'���A�zu4J"/t���_���\T^':Y_:x����o�>>���]���N~��ӧ�C�M��ۧ�y���u���o��ĜK�{�WߤaB���|U0߭i��#/�i7W�=2UPz՛��tm�"�bL��G�g$�����.���U,T�CX�HL_ `�PF��޸L�ѻ�)���*�7�.=��v_�_�]E�*����k���Ő��6��MC��W�ULC�>��e�To�s���eXHh�H�D�5u��c���.�`q��qO셽��#`s�g�ƽ�*P{��ΰ8����p���ێ��c4�/17��B�8�B�n�co����2���d�l���y�x�c0�3���z-�O�a �{:�dg6���^�/��J9�be���}Vl�����H�MG'�H�ݸR�\����-�܌�+t'u�[���ag�t٩��7�V��gw[�ݑ�m�����ed�լWc��%a�w�l)Q��ᶮIzciZ���Ϝd�C����6���LTsk�=*M���R�O��?m�NǕXG���pÅ��8R�%��f�������sD/XI$ �2�cXƔ�eIX�2�Z@����M�����"7�^��9	C��18�^��W�C ��B elK\YB�!��G�c��j���}^���� ���5<��|ݳ�����a�u�(���l�[ UYT�����f�߆�_���Op�;'�3��������w\�      h   �   x���]j�0 �g����$K��k�uPJ�Q��8�Qv�9�mYI�:�#��Iv醂�vW�O�!u;`G`A�P��ɠ��Cr-@�؋1cJ��� "#FUss�Ǘ��P�Tf5�"f�,�s~kJ5�(�Z`�IRbE3;�F҉��j�����O��'-��.2�(s� ^&���PQ�2�r�]?�~��6]�/����56��!�?��r�_�Q=�:ll=N�[�4�;L�      b   S  x��Yˎ\WwE!O��S9�}NK�B���A��<MDVb0�#;�$$�	�б�N�nw~����	�}oWwU��RH"�]ս��ϵ�:�U�(�,|iQX�Ƚ���[�b	2����~��������������ev4{9;�MfOf/�'�|=;�����)��0\s8����N&zo�OKm��Bˉ�����s���0��t2h7%c��=����mO���{�7�S"F[��ET$�,�u���~��8rMhO$l�N�V�0�4iT�:׳��w�w�w&�Gp�h�A!�;�9������Ġ�B��!�R���6�ڻ�޻�����7��oԼf��,eH|�I�ؒȡxaj�>�{Wg��>�[�bH���'���W��0��yv
W�~F ��h�(";B=N�zগ���x�_�C���bv̷]����_\
���T<�z��#鶙6Lі�t��"���QIM��|����u
�^��'C��P,�<a� ��/w��G�D����!`n�(�P�#1~�	n~�ޝp���N�|p�!����Sd�{����T�(��fڔIZ+�Ix��`�Hʡ�u�!הs3�,������`����ó�Ӆx� Q����˼(�3na.����K~>�Gh������c����@/�[��w�ws?|�M�0~)���6e�*o��Q�X@6��/B�P{��u���th��	<�?�`�:F����O������N���D����]
����O6�h�T�7Z���M!f���q�A�9��@$�n��S[��W.ۈ8��]4)�t �aH���,�y2��ʍq���a�G���-���ɵM�9TI���Dwa���Y�^���[� �bnMHgC�5���E+/��"L��Ct�P����p���@OTCl/���!��?:��-f|~k�����������7�>��[x�6~,"��F/��iS�I�D�,�Xa]��\E.��F-EJ����S��s�K<V��x��r�����t��w��h��� �6�����z�U����(�vZ L+��*���-���S�TPa��R�1hRP�Tl�T���+\��SϦ���Wj$�DSk5Q�f��e��XdX(��E$��i��ܭ�����4�F(%T�H�:0qI�S�j�r*���^�LǮ1�F �km�Hk*�Z-F����޾s�frV(�u�+�"[��DD%�c��
�����q�.�{u�ҙ"��Z�������j�K�E�(t5����`,�e4e�cr
�mn�ݤ�۔V��ة�Z��f�ԙ=���I��+`�s"ڈds�k���Eo��o^�jPf�܁5��t�n�D�hl�hld&:|��W���ԫ���2Xĉ�S�\)��\����1�]���PF�C��	��P3�T2���܂�g�(�����5n�7�K.��כ��~)cځ2���V�3a�"7�w^��&� QB�M�TX�H@2(�ʪ���N���?��/�޿�n��ׯor�L��DPK��E&�$$�K���0Eh������R��E�΁�⺈S.be�N��*�s�2;�:�ȶ�\��:y�4��<C��3�YѴ�S�V�)���V��s���}��Ld4J\�-�Ys��lHոH�R2�;�܍k�5�m�w���h4&��&�Ѓ��u�ܦ�1�Ms�^�jk�2B1n�m�.�K)قP�+T�6Yt����b�u���t�w�:��Q`�Ā&�*5W\�]���Yܡ�f�Z�-�}�=r�*�I*-:�h6��}Ǌ�]6����WR�,������n�����F�c�b��C.ɮyQ[=��M/��=7	4	�>g�=�^�Ҁr��N�!�y.KP��I�jJ�:D��uȤ�O�����1��W����)�F�%���=(4%�wkX<���|�������'�$B�0�-h���2z�B�M�_���Ԑ��K `��$Л �"v'��@;Ή�	�㭍�!�ڡ�z犓�x�X@p������BA�{U-VOv����}��!�C��ilXr�!L�@F-�+t� K�C�����.+�A�?���x&~>J��1ˋ������ ��I7;'=�70LQ�U��t�UŬ3��Ro=,�N�խK�N�� �=���O�X=MVuɰ���k���nS�˅3;��S%� m[�\3�* z�C��ߝ`Y�]����5j�)��B։���ϩ�^���/9�#(G.��~�D�J�!�k|)T�,I喇σd� ��z�p�}�2K	��A?�(���X��Ē%�K��sN�ǖ_	�^��^��a�(>��^��f� ���:�=��&�����`���(����Y^��u�6��N?�C�!
Q�i�;AdY����X3@��j�xvxu<��c�{��k�U��:$kW�7A5ȥm4yM���7��nj��d�;{���b+I�Ui+8P I���]���&��'_aD�T��]o��R�2�����;�j
48�0�vp�TR-c/�-�\#^�ڀa����U�h�@�ETw�3��	(��>7r�/���8(�s�M��v�,%dx��Ad�.:��!K4�S�v1��c3X�>��Eʠ	�eÓ���F�yp|����yd�7E� �4�ʶQމq���c�E��)褊�C�C�44XDEؔ3ʄ�7V��dv٦KI?�m�F����B8�%��T��Đ�IHwD��v �oz���.���\�J�ɥ3�͔d#�RnUC��Q���ȷ���zp�j��L��H�F{cԛh��� �cߏ��G%\-�K�0Щ�R�ٙ�ޮ鵐ĉs�����H�M�Q\b�#�$�"̝��g��"���f<�P�d���yIA��)��y�N����z��1xcך�"���Z��F�ӀvD,�i����A_0>gNP��O!��PX��.�h�������b�j�5[2F�
��� cp��Q��u�C��U
�����F�CIC_$�eDt�E��E�ʬ7��n��/�酺@�<dS�Y�䤮æ�t�x뵌��:�I��b̔eP�|�1Q��=h��͛7^}��w�lM7�|���m��?���k���ʕ��|�7W������=�3���s��K���Ē��d�q����'��!l:�ԁ�]�\ewg	� 
�� ���0�E�2�T���8�a��9�Z<���N���*�Yy�>��X�2�_f���� �"--�n��^c�2����3� Y۩R�Z_0��$hH� �S���E��\
��x���-eg�����蕝R�-J ��0�+Qꝣ� O�&8����&����
�s�$�6���!ʓ�0d(�!�?�o��5��v�O�������� �~!�      d   �  x���M��1����R��T�"HU��63~#�[q���Q�����i�]yIA���2������0~�'3�k|�O���=p����4*5���{�2~�������E�_�i&~<3WW��׏�\�'��G���Ct�BM�
e�ي��sQ��xsQ��DsѰ����"qн���s�MI�15�*p��+�H���S�KbAUb��r��jI")1�V�U��A�v���8��u�9�����Zo�h�J�C�^,jqTJN~V���Bl3D�c ԆP+��,X����%��I�����vy�<�9�fK�i�#DI����;��|�}���O^1o��g"��sE�{ ��攓�-V���ʕZ��m��z�{%�覇�:3�^h#���>�j;�+����{�J\B޾ٶ�v;�      c   �  x����n#7�����p@R�D�]ߣ@��IɎ��A����t�M�Aop>���Y�e��bQa(>4���s���s�[����gw�����4��.MI���'��� ǂ �d�
�9��T��
�?�z|8׾��z��Wg���c������R�  6��$��/�h��|����q&��j�;��#e�T1A)5�H��Ű\;�P�L�+�����yx �y�nF�I�-&�,�E0$o?�@v=�_J#�sl�?f�قsE�4�IWn��k�\�)�A)�j]BIJ>��>�g{�fN��ۓ�l\G��re�����C�]��{���u����(/3��1E+wG�n�D�#�&�V�)���5�z#���櫿�("F�i�mMB�:7��6�N�4�(_��Fi�4)RHnOzmzQY3�f+$$���)`͡b�Z�����u{z7�c�%N(�I���͡s� %��c3.�b�Ǌ~	�H������~�����T�qL���nbU�~O<��^�`AG1A�c�z�,QR���:��.�|y��a�i�0ٞ����A[R���h�5�U\���-/�����O��)�4���91�=i���6����΁T� �Z퓩��Z.�v����_�~<�ۈ����=�5�\��N��m���\H!��)'�z����q����ydwxY/O�_���|�[;���_�{{�ַ����,~���*{Ҩ�7Q;����!���5Y;��Vx�/�_ӽ:������(������? ��}      g      x������ � �     