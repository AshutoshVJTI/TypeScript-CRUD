import Card from "@mui/material/Card";
// @ts-ignore
import { User } from '../../TypeScript/types.tsx';
import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  cards: {
    display: "flex",
    flexDirection: "column",
    margin: 25,
    padding: "0px",
  },
  cardbuttons: {
    margin: "0px 5px 5px 5px",
    width: 80,
  },
  singleCard: {
    margin: 10,
  },
  a: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
});

const UserList = (props: User) => {
  const classes = styles();

  const deleteUser: User = useStoreActions(
    (actions: User) => actions.userList.deleteUser
  );

  const deleteCard = (id: number) => {
    deleteUser(id);
  };

  const fillForm = (val: User) => {
    props.updater(val.id);
  };

  return (
    <>
      <div>
        {props.data
          .slice(0)
          .reverse()
          .map((val: User) => {
            if (val.id !== 0) {
              return (
                <Card
                  variant="outlined"
                  className={classes.singleCard}
                  key={val.id}
                >
                  <Link to={`/user/${val.id}`} className={classes.a}>
                    <div className={classes.cards}>
                      <span>Name: {val.name}</span>
                      <span>Gender: {val.gender}</span>
                      <span>Age: {val.age}</span>
                    </div>
                  </Link>
                  <Button
                    className={classes.cardbuttons}
                    variant="outlined"
                    color="success"
                    onClick={() => fillForm(val)}
                  >
                    Update
                  </Button>
                  <Button
                    className={classes.cardbuttons}
                    variant="outlined"
                    color="error"
                    onClick={() => deleteCard(val.id)}
                  >
                    Delete
                  </Button>
                </Card>
              );
            } else return null;
          })}
      </div>
    </>
  );
};

export default UserList;
