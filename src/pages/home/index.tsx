import { useState } from "react";
import Button from "@components/button";
import Typography from "@components/typography";
import Page from "@components/page";
import Alert from "@components/alert";
import IconButton from "@components/icon-button";
import { MdClose } from "react-icons/md";
import { useTheme } from "@hooks/useTheme";
import Card from "@components/card";
import Tag from "@components/tag";

const Home = () => {
  const [count, setCount] = useState(0);
  const { getSpacing } = useTheme();

  return (
    <Page>
      <div className="container m-auto flex flex-col gap-4 text-start">
        <div className=" w-full flex flex-col gap-4"></div>
        <Typography variant="h1" className="text-primary">
          Heading 1 - Primary Color
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          condimentum scelerisque massa, vitae feugiat lacus rhoncus vel. Etiam
          sed dui condimentum, vulputate dui quis, pretium ligula. Mauris sed
          nisi vel neque posuere elementum. Mauris bibendum tincidunt ex quis
          mollis. Nullam id volutpat massa. Phasellus congue metus in imperdiet
          fermentum.
        </Typography>
        <Typography variant="h2" className="text-secondary">
          Heading 2 - Secondary Color
        </Typography>
        <Typography>
          Cras pellentesque nisi et dapibus eleifend. Donec nunc risus, varius
          id porttitor eget, luctus sed tellus. Ut sem ipsum, euismod in
          fermentum in, pretium a nunc.
        </Typography>
        <Typography variant="h3" className="text-tertiary">
          Heading 3 - Tertiary Color
        </Typography>
        <Typography>
          Integer pharetra velit quis sem pulvinar ultricies. Praesent eleifend
          neque a dolor ultricies dapibus. Duis dictum, neque a posuere rhoncus,
          magna felis viverra elit, vel laoreet dolor dui ac nibh. Sed sit amet
          libero libero. Phasellus nec lorem in augue accumsan porttitor. Duis
          in congue turpis.
        </Typography>
        <Typography variant="h4" className="text-text">
          Heading 4 - Text Color
        </Typography>
        <Typography>
          Etiam imperdiet massa quis ante auctor aliquet. Suspendisse id ornare
          augue. Duis fringilla leo ac velit eleifend, at mollis velit viverra.
          Maecenas lacinia malesuada orci, dapibus condimentum ligula posuere
          ut. Cras tincidunt gravida sapien eu ullamcorper.
        </Typography>
        <Typography variant="h5" className="text-text">
          Heading 5 - Text Color
        </Typography>
        <Typography>
          Pellentesque nunc purus, efficitur sed nibh in, sollicitudin semper
          quam. Nullam ut felis sodales, lacinia ipsum quis, posuere libero.
          Quisque vitae augue ipsum. Nunc convallis fermentum urna, eget
          suscipit arcu lacinia eu.
        </Typography>
        <Typography variant="h6" className="text-text">
          Heading 6 - Text Color
        </Typography>
        <Typography>
          Aliquam sagittis diam quis sem egestas tincidunt. Proin sollicitudin
          ipsum vitae tellus sagittis, non hendrerit odio commodo. Aliquam
          pulvinar urna mollis, pharetra enim eget, pulvinar arcu.
        </Typography>
        <Typography variant="subtitle" className="text-text">
          Subtitle - Text Color
        </Typography>
        <Typography>
          Vestibulum eu hendrerit augue. Mauris vehicula lacinia ex, eget
          pellentesque arcu laoreet sit amet. Suspendisse elementum lectus ut
          nisl consequat convallis. Pellentesque volutpat nunc at leo tempor
          accumsan. Vivamus vel metus eros.
        </Typography>
        <Typography variant="subtitle-secondary" className="text-text">
          Subtitle Secondary - Text Color
        </Typography>
        <Typography>
          Curabitur interdum aliquet nulla vel feugiat. Vestibulum consectetur
          tempor mi vitae euismod. Fusce mauris erat, condimentum quis magna sit
          amet, varius fermentum tellus. Duis eu turpis ex.
        </Typography>
        <Typography variant="body" className="text-text">
          Body - Text Color
        </Typography>
        <Typography variant="body-secondary" className="text-text">
          Body Secondary - Text Color
        </Typography>
        <Typography variant="button" className="text-text">
          Button - Text Color
        </Typography>
        <Typography variant="caption" className="text-text">
          Caption - Text Color
        </Typography>
        <Alert className="font-medium" level="success">
          <div className="flex justify-between">
            This is a success alert!{" "}
            <IconButton icon={<MdClose size={getSpacing(3)} />} />
          </div>
        </Alert>
        <Alert className="font-medium" level="error">
          <div className="flex justify-between">
            This is a error alert!
            <IconButton icon={<MdClose size={getSpacing(3)} />} />
          </div>
        </Alert>
        <Alert className="font-medium" level="warning">
          <div className="flex justify-between">
            This is a warning alert!
            <IconButton icon={<MdClose size={getSpacing(3)} />} />
          </div>
        </Alert>
        <Alert className="font-medium" level="info">
          <div className="flex justify-between">
            This is a information alert!
            <IconButton icon={<MdClose size={getSpacing(3)} />} />
          </div>
        </Alert>
        <Button
          className="w-auto"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <div className="flex gap-4 flex-wrap justify-evenly">
          <Card
            title="The Coldest Sunset"
            image={{
              url: "https://plus.unsplash.com/premium_photo-1673452731734-91291306025e?q=80&w=1002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              className: "h-30",
            }}
            actions={
              <>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  photography
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  travel
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  sunset
                </Tag>
              </>
            }
          >
            <p className="text-body-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </Card>
          <Card
            title="Flowers"
            image={{
              url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              className: "h-30",
            }}
            actions={
              <>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  photography
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  travel
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  flower
                </Tag>
              </>
            }
          >
            <p className="text-body-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </Card>
          <Card
            title="Airplane"
            image={{
              url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              className: "h-30",
            }}
            actions={
              <>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  flight
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  clouds
                </Tag>
                <Tag className="!text-tertiary bg-tertiary-contrast border-tertiary border-2">
                  airplane
                </Tag>
              </>
            }
          >
            <p className="text-body-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default Home;
