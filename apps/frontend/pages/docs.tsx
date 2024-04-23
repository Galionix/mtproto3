import ReactMarkdown from "react-markdown";
import rehypeTOC from "rehype-toc";
import rehypeSlug from "rehype-slug";
import { Layout } from "../src/shared/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TextInput,
  TextInputWithChoicesList,
} from "../src/shared/Input/TextInput";
import { Clickable } from "../src/shared/Clickable/Clickable";
import s from "./docs.module.scss";

const Docs = ({ content }: { content: string }) => {
  const router = useRouter();

  // in content we have the markdown content
  // we can parse it to get the topics and subtopics
  // each topic should have its own subtopics

  const topics: {
    name: string;
    subtopics: string[];
  }[] = content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .reduce((acc, line) => {
      // const name = line.replaceAll("#", "").trim();
      if (line.startsWith("# ")) {
        const name = line.replaceAll("#", "").trim();
        return [...acc, { name, subtopics: [] }];
      }
      if (line.startsWith("## ")) {
        console.log("line: ", line);
        const subtopic = line.replaceAll("##", "").trim();
        const lastTopic = acc[acc.length - 1];
        lastTopic.subtopics.push(subtopic);
        return acc;
      }
    }, []);
  //   console.log("topics: ", topics);
  //   const topics = content
  //     .split("\n")
  //     .filter((line) => line.startsWith("# "))
  //         .map((line) => line.replaceAll("#", "").trim());

  //     const subtopics = content
  //         .split("\n")
  //         .filter((line) => line.startsWith("## "))
  //         .map((line) => line.replaceAll("#", "").trim());
  //         console.log("topics: ", topics);
  //         console.log("subtopics: ", subtopics);

  useEffect(() => {
    const path = decodeURI(router.asPath.replace("/docs", ""));
    console.log(path);
    if (path && path.includes("#")) {
      setTimeout(() => {
        const id = path.replace("#", "");
        const el = window.document.getElementById(id);
        if (!el) return;
        if (!window.top) return;

        const r = el.getBoundingClientRect();
        window.top.scroll({
          top: pageYOffset + r.top,
          behavior: "smooth",
        });
      }, 600);
    }
  }, [router]);

  return (
    <Layout className={s.layout}>
      <h1>Docs page</h1>
      <div className="flex flex-row gap-4">
        <TopicsPanel topics={topics} />
        <main>
          <ReactMarkdown rehypePlugins={[rehypeSlug, rehypeTOC]}>
            {/* <p></p> */}
            {content}
          </ReactMarkdown>
        </main>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = await require("../src/docs/docs.md").default;
  console.log("content: ", content);
  return {
    props: {
      content,
    },
  };
}

const TopicsPanel = ({
  topics,
}: {
  topics: {
    name: string;
    subtopics: string[];
  }[];
}) => {
  // this panel is a sidebar that shows the topics
  // and subtopics of the documentation
  // we can filter the topics and subtopics to search for a specific topic

  const [search, setSearch] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(topics);

  useEffect(() => {
    if (!search) {
      setFilteredTopics(topics);
      return;
    }
    const filteredTopics = topics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(search?.toLowerCase()) ||
        topic.subtopics.some((subtopic) =>
          subtopic.toLowerCase().includes(search?.toLowerCase())
        )
    );
    const filteredTopicsAndSubtopics = filteredTopics.map((topic) => {
      return {
        ...topic,
        subtopics: topic.subtopics.filter((subtopic) =>
          subtopic.toLowerCase().includes(search?.toLowerCase())
        ),
      };
    });
    setFilteredTopics(filteredTopicsAndSubtopics);
  }, [topics, search]);

  const choices = filteredTopics
    .map((topic) => {
      return [topic.name, ...topic.subtopics];
    })
    .flat();

  return (
    <aside className="w-1/4 h-fit top-0 sticky">
      <TextInputWithChoicesList
        value={search}
        choices={choices}
        onChange={(e) => setSearch(e)}
        placeholder="Search topics"
        showClear
      />
      {filteredTopics.map((topic) => {
        const topicId = topic.name
          .toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll(".", "")
          .replaceAll("?", "")
          .replaceAll(":", "")
          .replaceAll(",", "");
        return (
          <div key={topic.name}>
            <span
              className="cursor-pointer hover:underline text-blue-500"
              // primary
              // comp="link"
              // href={``}
              onClick={() => {
                const el = window.document.getElementById(topicId);
                if (!el) return;
                if (!window.top) return;
                const r = el.getBoundingClientRect();
                window.top.scroll({
                  top: pageYOffset + r.top,
                  behavior: "smooth",
                });
              }}
            >
              {topic.name}
            </span>
            {/* <h2>{topic.name}</h2> */}
            <ul>
              {topic.subtopics.map((subtopic) => {
                const subtopicId = subtopic
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll(".", "")
                  .replaceAll("?", "")
                  .replaceAll(":", "")
                  .replaceAll(",", "");
                return (
                  <li className="ml-4" key={subtopic}>
                    <span
                      className="cursor-pointer hover:underline"
                      // comp="link"
                      // href={`#${subtopic}`}
                      onClick={() => {
                        const el = window.document.getElementById(subtopicId);
                        if (!el) return;
                        if (!window.top) return;
                        const r = el.getBoundingClientRect();
                        window.top.scroll({
                          top: pageYOffset + r.top,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {subtopic}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};

export default Docs;
