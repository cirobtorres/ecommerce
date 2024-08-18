import { getUserData } from "@/lib/getUserData";
import { createClient } from "../utils/supabase/server";
import Body from "../components/Body";

export default async function RefrigelHomePage() {
  // const { data, error } = await supabase.auth.getUser();
  const supabase = createClient();
  const { user } = await getUserData();

  return (
    <Body user={user}>
      <main className="py-8 max-w-[1440px] mx-auto px-10">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          in corporis reprehenderit, quos optio porro vero blanditiis facilis
          minus nisi, rerum quo, laboriosam sequi. Omnis ducimus hic assumenda
          doloribus laboriosam? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Repudiandae in corporis reprehenderit, quos optio
          porro vero blanditiis facilis minus nisi, rerum quo, laboriosam sequi.
          Omnis ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae in corporis reprehenderit, quos optio porro vero
          blanditiis facilis minus nisi, rerum quo, laboriosam sequi. Omnis
          ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          in corporis reprehenderit, quos optio porro vero blanditiis facilis
          minus nisi, rerum quo, laboriosam sequi. Omnis ducimus hic assumenda
          doloribus laboriosam? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Repudiandae in corporis reprehenderit, quos optio
          porro vero blanditiis facilis minus nisi, rerum quo, laboriosam sequi.
          Omnis ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae in corporis reprehenderit, quos optio porro vero
          blanditiis facilis minus nisi, rerum quo, laboriosam sequi. Omnis
          ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          in corporis reprehenderit, quos optio porro vero blanditiis facilis
          minus nisi, rerum quo, laboriosam sequi. Omnis ducimus hic assumenda
          doloribus laboriosam? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Repudiandae in corporis reprehenderit, quos optio
          porro vero blanditiis facilis minus nisi, rerum quo, laboriosam sequi.
          Omnis ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae in corporis reprehenderit, quos optio porro vero
          blanditiis facilis minus nisi, rerum quo, laboriosam sequi. Omnis
          ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          in corporis reprehenderit, quos optio porro vero blanditiis facilis
          minus nisi, rerum quo, laboriosam sequi. Omnis ducimus hic assumenda
          doloribus laboriosam? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Repudiandae in corporis reprehenderit, quos optio
          porro vero blanditiis facilis minus nisi, rerum quo, laboriosam sequi.
          Omnis ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae in corporis reprehenderit, quos optio porro vero
          blanditiis facilis minus nisi, rerum quo, laboriosam sequi. Omnis
          ducimus hic assumenda doloribus laboriosam? Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Repudiandae in corporis
          reprehenderit, quos optio porro vero blanditiis facilis minus nisi,
          rerum quo, laboriosam sequi. Omnis ducimus hic assumenda doloribus
          laboriosam?
        </p>
      </main>
    </Body>
  );
}
